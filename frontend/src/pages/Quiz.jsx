import { useEffect, useState } from "react";
import PatientInfo from "./PatientInfo";

const Quiz = () => {
  const nodeEnv = process.env.NODE_ENV;
  const [hasStarted, setHasStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [errors, setErrors] = useState({});
  const [patientData, setPatientData] = useState({
    name: "",
    email: "",
  });
  const [score, setScore] = useState({
    EI: 0,
    WI: 0,
    EC: 0,
    WC: 0,
    EA: 0,
    WA: 0,
  });
  const [showResults, setShowResults] = useState(false);

  // Load questions from the Express server
  useEffect(() => {
    fetch("http://localhost:5005/quiz-data") // Ensure this matches your Express endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the fetched data for debugging
        setQuestions(data); // Assuming the API returns an array of questions
      })
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, []);

  const handleResponseChange = (questionId, response) => {
    console.log("Question ID:", questionId, "Response:", response); // Debugging log

    // Update the responses state with the new response for the given questionId
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: response, // Set the response for this specific question
    }));

    // Clear the error state for this question since an answer has been provided
    setErrors((prevErrors) => ({
      ...prevErrors,
      [questionId]: false, // No error for this question anymore
    }));
  };

  const validateResponses = () => {
    const newErrors = {};
    let allValid = true;

    // Validate each question is answered
    questions[0].sections.forEach((section) => {
      section.questions.forEach((question) => {
        console.log("question id", question.question_id);
        if (responses[question.question_id] === undefined) {
          newErrors[question.question_id] = true; // Mark as an error if not answered
          allValid = false;
        }
      });
    });

    setErrors(newErrors);
    return allValid;
  };

  const calculateScore = () => {
    // Validate responses before calculating the score
    if (!validateResponses()) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Initialize a score object for each section
    const newScore = {
      EI: 0,
      WI: 0,
      EC: 0,
      WC: 0,
      EA: 0,
      WA: 0,
      VA: 0,
    };

    // Iterate through responses to calculate the score
    Object.entries(responses).forEach(([key, value]) => {
      console.log("Question ID:", key, "Response:", value);

      // Find the question based on question_id
      const question = questions[0].sections
        .flatMap((section) => section.questions)
        .find((q) => q.question_id === parseInt(key)); // Use question_id to find the correct question

      if (question) {
        console.log("Found Question:", question);

        // Determine the section of the found question
        const section = questions[0].sections.find((sec) =>
          sec.questions.some((q) => q.question_id === question.question_id)
        );

        if (section) {
          // Determine the category based on section name
          const sectionName = section.name;

          // Map section name to corresponding score category
          switch (sectionName) {
            case "Demographics":
              newScore.EI += value;
              break;
            case "Health History":
              newScore.WI += value;
              break;
            case "Behavioral Health":
              newScore.EC += value;
              break;
            case "Medical History":
              newScore.WC += value;
              break;
            case "Family Medical History":
              newScore.EA += value;
              break;
            case "Social History":
              newScore.WA += value;
              break;
            case "Dietary Habits":
              newScore.VA += value;
            default:
              console.warn(`Unrecognized section: ${sectionName}`);
          }
        }
      } else {
        console.log("Question not found for Question ID:", key);
      }
    });

    setScore(newScore);
    setShowResults(true);
  };

  const answerAllQuestionsRandomly = () => {
    questions[0].sections.map((section) => {
      section.questions.map((question) => {
        const randomAnswer = Math.floor(Math.random() * 5); // Generate a random integer from 0 to 4

        handleResponseChange(question.question_id, randomAnswer); // Call the function to update responses
      });
    });
  };

  if (!hasStarted) {
    return (
      <div>
        <PatientInfo
          patientData={patientData}
          setPatientData={setPatientData}
          setHasStarted={setHasStarted}
        />
      </div>
    );
  }
  console.log("selected answers", responses);

  return (
    <div className="pb-16">
      <div>
        <div className="max-w-screen-sm mx-auto">
          {showResults ? (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-center">Your Scores</h2>
              <ul className="list-none text-lg">
                {Object.entries(score).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          ) : questions.length === 0 ? (
            <p>Loading questions...</p>
          ) : (
            <div className="space-y-12">
              <h1 className="text-2xl font-bold text-[#1D126C] text-center mb-10">
                Neurodivergent Workplace Inclusion Test
              </h1>
              {questions[0].sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="p-4 rounded-md border">
                  <p className="text-2xl font-bold -mt-8 z-10 bg-white flex justify-start w-fit">
                    {section.name}
                  </p>
                  {section.questions.map((question, questionIndex) => (
                    <div
                      key={question.question_id}
                      className={`mb-4 mt-2 last:mb-0 bg-gray-100 p-4 rounded-lg ${
                        errors[question.id] ? "border border-red-600" : ""
                      }`}
                    >
                      <h4 className="text-lg font-medium mb-2">
                        {questionIndex + 1}. {question.question}
                      </h4>
                      <div className="grid grid-cols-1 gap-1 pl-4">
                        {/* Radio buttons for each answer option */}
                        {[0, 1, 2, 3, 4].map((value) => (
                          <label key={value} className="flex gap-2">
                            <input
                              type="radio"
                              name={`question_${question.question_id}`} // Group radio buttons by question ID
                              value={value}
                              checked={
                                responses[question.question_id] === value
                              }
                              onChange={() =>
                                handleResponseChange(
                                  question.question_id,
                                  value
                                )
                              } // Update response state
                              required
                            />
                            {questionIndex <= 30 ? (
                              <>
                                {" "}
                                {value === 0 && "Not at all"}
                                {value === 1 && "Sometimes"}
                                {value === 2 && "On Occasion"}
                                {value === 3 && "Most of the time"}
                                {value === 4 && "All the time"}
                              </>
                            ) : (
                              <>
                                {value === 0 && "No One"}
                                {value === 1 && "One or Two"}
                                {value === 2 && "Some Individuals"}
                                {value === 3 && "A Small Group of Individuals"}
                                {value === 4 && "Many Individuals"}
                                {value === 5 && "Almost Everyone"}
                              </>
                            )}
                          </label>
                        ))}
                      </div>
                      {errors[question.id] && (
                        <p className="text-red-600">Please select an answer.</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {!showResults && (
            <div className="w-full flex justify-end gap-2">
              {nodeEnv === "development" && (
                <button
                  onClick={answerAllQuestionsRandomly}
                  className="p-3 mt-4 bg-green-600 hover:bg-green-700 transition-colors duration-200 rounded-md text-white min-w-32"
                >
                  Answer all questions
                </button>
              )}

              <button
                onClick={calculateScore}
                className="p-3 mt-4 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-md text-white min-w-32"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
