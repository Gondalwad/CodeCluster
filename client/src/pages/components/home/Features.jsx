// Developed By Urvashi
import {
  BrainCircuit,
  Code2,
  Trophy,
  GraduationCap,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Evaluation",
    description:
      "Automatically evaluate descriptive answers with AI-generated scores and feedback.",
  },
  {
    icon: Code2,
    title: "Coding Assessments",
    description:
      "Execute code against predefined test cases with support for multiple programming languages.",
  },
  {
    icon: Trophy,
    title: "Coding Contests",
    description:
      "Host real-time contests with leaderboards and challenge developers to compete.",
  },
  {
    icon: GraduationCap,
    title: "Practice Platform",
    description:
      "Improve problem-solving skills through coding questions organized by difficulty.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track learning progress and monitor performance with detailed insights.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Assessments",
    description:
      "Conduct online examinations with secure authentication and role-based access.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-[#09090B] py-28">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-4xl font-bold text-white">
            Everything You Need in One Platform
          </h2>

          <p className="mt-5 text-zinc-400 leading-8">
            CodeCluster combines assessments, coding practice,
            AI evaluation, contests, and analytics into a
            single learning ecosystem.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition duration-300 hover:border-violet-500 hover:-translate-y-2"
              >
                <div className="inline-flex rounded-xl bg-violet-500/10 p-3">

                  <Icon
                    size={28}
                    className="text-violet-400"
                  />

                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">

                  {feature.title}

                </h3>

                <p className="mt-4 leading-7 text-zinc-400">

                  {feature.description}

                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Features;