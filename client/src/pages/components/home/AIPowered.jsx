// Developed By Urvashi
import {
  FileText,
  BrainCircuit,
  CheckCircle2,
  UserCheck,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Student Submission",
    description:
      "Students submit descriptive answers or coding solutions.",
  },
  {
    icon: BrainCircuit,
    title: "AI Evaluation",
    description:
      "AI analyzes responses and generates suggested scores with feedback.",
  },
  {
    icon: CheckCircle2,
    title: "Suggested Result",
    description:
      "Evaluation reports are prepared instantly for review.",
  },
  {
    icon: UserCheck,
    title: "Faculty Review",
    description:
      "Instructors validate AI suggestions before publishing results.",
  },
];

const AIPowered = () => {
  return (
    <section id="ai" className="bg-[#0D0D10] py-28">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid gap-16 lg:grid-cols-2 items-center">

          {/* Left */}

          <div>

            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">

              AI Powered Assessment

            </span>

            <h2 className="mt-8 text-4xl font-bold text-white">

              Smarter Evaluation.
              <br />
              Less Manual Work.

            </h2>

            <p className="mt-6 text-zinc-400 leading-8">

              Evaluate descriptive answers in seconds with
              AI-assisted scoring while giving instructors
              complete control over the final result.

            </p>

          </div>

          {/* Right */}

          <div className="space-y-6">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="flex gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10">

                    <Icon
                      size={28}
                      className="text-violet-400"
                    />

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-white">

                      {step.title}

                    </h3>

                    <p className="mt-2 leading-7 text-zinc-400">

                      {step.description}

                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
};

export default AIPowered;