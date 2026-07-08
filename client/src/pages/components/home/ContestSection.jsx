// Developed By Urvashi
import { Trophy, Clock3, Code2 } from "lucide-react";
import Button from "../../ui/Button";

const contestFeatures = [
  {
    icon: Trophy,
    title: "Real-Time Leaderboards",
    description:
      "Track rankings instantly as participants solve problems during live contests.",
  },
  {
    icon: Code2,
    title: "Multiple Languages",
    description:
      "Support Java, C, C++, Python and more for coding challenges.",
  },
  {
    icon: Clock3,
    title: "Timed Challenges",
    description:
      "Simulate real placement rounds with time-bound programming contests.",
  },
];

const ContestSection = () => {
  return (
    <section
      id="contest"
      className="bg-[#09090B] py-28"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* Left */}

            <div className="p-10 lg:p-14">

              <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">

                Coding Contests

              </span>

              <h2 className="mt-8 text-4xl font-bold text-white leading-tight">

                Compete Beyond
                <br />
                the Classroom.

              </h2>

              <p className="mt-6 text-zinc-400 leading-8">

                Participate in coding contests, sharpen your
                problem-solving skills, and experience
                real-world programming challenges through
                competitive coding events.

              </p>

              <div className="mt-10">

                <Button value="Explore Contests"/>

              </div>

            </div>

            {/* Right */}

            <div className="grid gap-6 p-10 lg:p-14 bg-zinc-950">

              {contestFeatures.map((feature, index) => {

                const Icon = feature.icon;

                return (

                  <div
                    key={index}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                  >

                    <div className="flex items-center gap-4">

                      <div className="rounded-xl bg-violet-500/10 p-3">

                        <Icon
                          size={24}
                          className="text-violet-400"
                        />

                      </div>

                      <div>

                        <h3 className="font-semibold text-white">

                          {feature.title}

                        </h3>

                        <p className="mt-2 text-zinc-400 leading-7">

                          {feature.description}

                        </p>

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContestSection;