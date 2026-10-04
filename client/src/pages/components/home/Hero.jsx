// Developed By Urvashi
import { Cpu, ArrowRight } from "lucide-react";
import Button from "../../ui/Button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#09090B]">

      {/* Background Glow */}

      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-700/20 blur-[150px]" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6">

        <div className="grid w-full items-center gap-16 lg:grid-cols-2 mt-2">

          {/* Left */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">

              <Cpu size={16} />

              AI Powered Coding Assessment Platform

            </div>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white lg:text-7xl">

              Learn.

              <br />

              Practice.

              <br />

              Compete.

              <br />

              <span className="text-violet-500">

                Evaluate.

              </span>

            </h1>

            <h2 className="mt-8 text-3xl font-semibold text-white ">

              The Galaxy of Programmers

            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">

              Conduct AI-powered coding assessments,
              practice programming,
              host coding contests,
              and simplify technical learning through one
              intelligent platform.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Button value="Get Started"/>

              <Button value="Explore Platform"/>


            </div>

          </div>

          {/* Right */}

          <div className="relative">

            <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">

              {/* Header */}

              <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">

                <div className="flex gap-2">

                  <div className="h-3 w-3 rounded-full bg-red-500" />

                  <div className="h-3 w-3 rounded-full bg-yellow-500" />

                  <div className="h-3 w-3 rounded-full bg-green-500" />

                </div>

                <span className="text-sm text-zinc-400">

                  Java

                </span>

              </div>

              {/* Code */}

              <pre className="overflow-x-auto p-6 text-sm text-zinc-300">

{`class Solution {

    public int[] twoSum(
        int[] nums,
        int target
    ) {

    }

}`}

              </pre>

              {/* Bottom */}

              <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 p-6">

                <div className="rounded-xl bg-zinc-800 p-4">

                  <p className="text-sm text-zinc-400">

                    Test Cases

                  </p>

                  <h3 className="mt-2 font-semibold">

                    2 / 2 Passed

                  </h3>

                </div>

                <div className="rounded-xl bg-zinc-800 p-4">

                  <p className="text-sm text-zinc-400">

                    AI Evaluation

                  </p>

                  <h3 className="mt-2 font-semibold text-green-400">

                    Excellent

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;