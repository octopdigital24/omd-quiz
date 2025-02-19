import React, { useEffect } from "react";

const Result = ({ score, handleReset }) => {
  const nodeEnv = process.env.NODE_ENV;

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner of the window
  }, []);

  return (
    <div className="overflow-x-auto flex flex-col justify-center">
      <div className="space-y-3 grid grid-cols-1  mx-auto  overflow-x-auto px-5 pb-2 ">
        <h2 className="text-2xl font-bold text-center mb-6">Your Scores</h2>

        {/* Row 1 */}
        <div className="flex  relative w-[1024px] ml-3  ">
          <p className="-rotate-90 absolute top-1/2  right-[97%] font-bold text-green-500">
            EXPRESSED
          </p>
          <div className="grid grid-cols-4 gap-3 w-full">
            <div>
              <p className="uppercase text-center text-blue-500 font-bold">
                Social Inclusion
              </p>
              <div className="border rounded-lg overflow-hidden">
                <p className="bg-gray-200 p-3 text-center">
                  Expressed Social Inclusion
                </p>
                <p className="p-6 text-center text-xl font-medium">
                  {score.EI}
                </p>
              </div>
            </div>
            <div>
              <p className="uppercase text-center text-cyan-500 font-bold">
                Decision Making
              </p>
              <div className="border rounded-lg overflow-hidden">
                <p className="bg-gray-200 p-3 text-center">
                  Expressed Decision Making
                </p>
                <p className="p-6 text-center text-xl font-medium">
                  {score.EC}
                </p>
              </div>
            </div>
            <div>
              <p className="uppercase text-center text-slate-500 font-bold">
                Acceptance
              </p>
              <div className="border rounded-lg overflow-hidden">
                <p className="bg-gray-200 p-3 text-center">
                  Expressed Acceptance
                </p>
                <p className="p-6 text-center text-xl font-medium">
                  {score.EA}
                </p>
              </div>
            </div>
            <div>
              <br />
              <div className="border rounded-lg overflow-hidden">
                <p className="bg-green-500 text-white p-3 text-center">
                  Total Expressed Behavior
                </p>
                <p className="p-6 text-center text-xl font-medium">
                  {score.EI + score.EC + score.EA}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}

        <div className="flex relative  w-[1024px] ml-3">
          <p className="-rotate-90 absolute top-1/2  right-[98.5%] text-purple-500 font-bold">
            WANTED
          </p>
          <div className="grid grid-cols-4 gap-3 w-full">
            <div className="border rounded-lg overflow-hidden">
              <p className="bg-gray-200 p-3 text-center">
                Wanted Social Inclusion
              </p>
              <p className="p-6 text-center text-xl font-medium">{score.WI}</p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <p className="bg-gray-200 p-3 text-center">
                Wanted Decision Making
              </p>
              <p className="p-6 text-center text-xl font-medium">{score.WC}</p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <p className="bg-gray-200 p-3 text-center">Wanted Acceptance</p>
              <p className="p-6 text-center text-xl font-medium">{score.WA}</p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <p className="bg-purple-500 text-white p-3 text-center">
                Total Wanted Behavior
              </p>
              <p className="p-6 text-center text-xl font-medium">
                {score.WI + score.WC + score.WA}
              </p>
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex relative  w-[1024px] ml-3">
          <div className="grid grid-cols-4 gap-3 w-full">
            <div className="border rounded-lg overflow-hidden">
              <p className="bg-blue-500 text-white p-3 text-center">
                Total For Social Inclusion
              </p>
              <p className="p-6 text-center text-xl font-medium">
                {score.WI + score.EI}
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <p className="bg-cyan-500 text-white p-3 text-center">
                Total For Decision Making
              </p>
              <p className="p-6 text-center text-xl font-medium">
                {score.WC + score.EC}
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <p className="bg-slate-500 p-3 text-center text-white">
                Total For Acceptance
              </p>
              <p className="p-6 text-center text-xl font-medium">
                {score.WA + score.EA}
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <p className="bg-yellow-500 text-white p-3 text-center">
                Overall
              </p>
              <p className="p-6 text-center text-xl font-medium">
                {score.WI +
                  score.WC +
                  score.WA +
                  score.EI +
                  score.EC +
                  score.EA}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sensory Impact */}
      <div className="max-w-screen-lg mx-auto mt-10 space-y-5 ">
        <div className="w-full md:w-60 pl-5">
          <p className="uppercase text-center text-orange-500 font-bold">
            Sensory Impact
          </p>
          <div className="border rounded-lg overflow-hidden">
            <p className="bg-orange-500 text-white p-3 text-center">
              Sensory Impact
            </p>
            <p className="p-6 text-center text-xl font-medium">{score.SI}</p>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="pb-16 max-w-screen-lg mx-auto px-5 lg:px-0 ">
        <div className="py-16 max-w-screen-lg mx-auto space-y-16">
          <div className="grid grid-cols-1 gap-4">
            {/* Social Inclusion section */}
            <div>
              <p className="text-xl font-semibold mb-4 ">Social Inclusion</p>

              {/* Graph container */}
              <div className="grid grid-cols-6 items-center gap-4">
                {/* Labels */}
                <div className="col-span-1 ">
                  <p className="text-right opacity-60">Expressed</p>
                </div>

                {/* Expressed Bar */}
                <div className="ml-5 md:ml-0 col-span-5  flex items-center gap-2">
                  <div className="w-full relative h-10 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-orange-500"
                      style={{ width: `${score.EI}%` }}
                    ></div>
                  </div>
                  {score.EI}%
                </div>
              </div>

              {/* Wanted Section */}
              <div className="grid grid-cols-6 items-center gap-4 mt-4">
                {/* Labels */}
                <div className="col-span-1">
                  <p className="text-right opacity-60">Wanted</p>
                </div>

                {/* Wanted Bar */}
                <div className="ml-5 md:ml-0  col-span-5  flex items-center gap-2">
                  <div className="w-full relative h-10 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-blue-500"
                      style={{ width: `${score.WI}%` }}
                    ></div>
                  </div>
                  {score.WI}%
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* Decision Making section */}
            <div>
              <p className="text-xl font-semibold mb-4">Decision Making</p>

              {/* Graph container */}
              <div className="grid grid-cols-6 items-center gap-4">
                {/* Labels */}
                <div className="col-span-1">
                  <p className="text-right opacity-60">Expressed</p>
                </div>

                {/* Expressed Bar */}
                <div className="ml-5 md:ml-0  col-span-5 flex items-center gap-2">
                  <div className="w-full relative h-10 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-orange-500"
                      style={{ width: `${score.EC}%` }}
                    ></div>
                  </div>
                  {score.EC}%
                </div>
              </div>

              {/* Wanted Section */}
              <div className="grid grid-cols-6 items-center gap-4 mt-4">
                {/* Labels */}
                <div className="col-span-1">
                  <p className="text-right opacity-60">Wanted</p>
                </div>

                {/* Wanted Bar */}
                <div className="col-span-5 ml-5 md:ml-0  flex items-center gap-2">
                  <div className="w-full relative h-10 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-blue-500"
                      style={{ width: `${score.WC}%` }}
                    ></div>
                  </div>
                  {score.WC}%
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* Acceptance section */}
            <div>
              <p className="text-xl font-semibold mb-4">Acceptance</p>

              {/* Graph container */}
              <div className="grid grid-cols-6 items-center gap-4">
                {/* Labels */}
                <div className="col-span-1">
                  <p className="text-right opacity-60">Expressed</p>
                </div>

                {/* Expressed Bar */}
                <div className="col-span-5 ml-5 md:ml-0  flex items-center gap-2">
                  <div className="w-full relative h-10 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-orange-500"
                      style={{ width: `${score.EA}%` }}
                    ></div>
                  </div>
                  {score.EA}%
                </div>
              </div>

              {/* Wanted Section */}
              <div className="grid grid-cols-6 items-center gap-4 mt-4">
                {/* Labels */}
                <div className="col-span-1">
                  <p className="text-right opacity-60">Wanted</p>
                </div>

                {/* Wanted Bar */}
                <div className="col-span-5 ml-5 md:ml-0  flex items-center gap-2">
                  <div className="w-full relative h-10 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-blue-500"
                      style={{ width: `${score.WA}%` }}
                    ></div>
                  </div>
                  {score.WA}%
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* Sensory Impact section */}
            <div>
              <p className="text-xl font-semibold mb-4">Sensory Impact</p>

              {/* Graph container */}
              <div className="grid grid-cols-6 items-center gap-4">
                {/* Labels */}
                <div className="col-span-1">
                  <p className="text-right opacity-60">Sensory Impact</p>
                </div>

                {/* Expressed Bar */}
                <div className="col-span-5 ml-5 md:ml-0  flex items-center gap-2">
                  <div className="w-full relative h-10 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-orange-500"
                      style={{ width: `${score.EA}%` }}
                    ></div>
                  </div>
                  {score.EA}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
