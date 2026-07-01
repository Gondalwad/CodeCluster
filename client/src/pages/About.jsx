import { Code2, Users, Trophy, Sparkles, Cpu, Rocket } from "lucide-react";

export default function About() {
  return (
    <div className="bg-[#050816] text-white">

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300 mb-6">
          <Sparkles size={16}/>
          About CodeCluster
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl">
          Learn.
          <span className="text-blue-400"> Practice.</span>
          <br />
          Grow Together.
        </h1>

        <p className="text-gray-400 mt-8 max-w-2xl text-lg leading-8">
          CodeCluster is an AI-powered coding platform designed to help
          developers improve problem solving, prepare for interviews,
          participate in contests and track their growth—all in one place.
        </p>
      </section>

      {/* Story */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-14">

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Our Story
            </h2>

            <p className="text-gray-400 leading-8 mb-6">
              Learning Data Structures and Algorithms usually means switching
              between multiple websites, keeping notes separately and having no
              clear picture of your progress.
            </p>

            <p className="text-gray-400 leading-8">
              We built CodeCluster to solve this problem by bringing AI
              assistance, coding practice, contests, analytics and learning
              resources into one unified platform.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-8">

            <h3 className="text-2xl font-semibold mb-6">
              Our Mission
            </h3>

            <p className="text-gray-400 leading-8">
              Make coding practice smarter, more organized and more enjoyable
              for every student—from beginners to placement aspirants.
            </p>

          </div>

        </div>

      </section>

      {/* Values */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-3xl font-bold text-center mb-14">
          What We Believe
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <Code2 className="text-blue-400 mb-6" size={40}/>
            <h3 className="text-xl font-semibold mb-3">
              Learn by Building
            </h3>
            <p className="text-gray-400">
              Practical coding beats passive learning every single time.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <Users className="text-purple-400 mb-6" size={40}/>
            <h3 className="text-xl font-semibold mb-3">
              Community First
            </h3>
            <p className="text-gray-400">
              Learn together through discussions, contests and collaboration.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <Trophy className="text-cyan-400 mb-6" size={40}/>
            <h3 className="text-xl font-semibold mb-3">
              Consistency Wins
            </h3>
            <p className="text-gray-400">
              Small daily improvements create long-term success.
            </p>
          </div>

        </div>

      </section>

      {/* Why Choose */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Why Choose CodeCluster?
            </h2>

            <div className="space-y-5">

              <div className="flex gap-4">
                <Rocket className="text-blue-400"/>
                <p className="text-gray-400">
                  AI-powered coding assistance
                </p>
              </div>

              <div className="flex gap-4">
                <Cpu className="text-purple-400"/>
                <p className="text-gray-400">
                  Real-time code execution
                </p>
              </div>

              <div className="flex gap-4">
                <Trophy className="text-cyan-400"/>
                <p className="text-gray-400">
                  Coding contests & progress tracking
                </p>
              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg p-10">

            <h3 className="text-2xl font-semibold mb-4">
              One Platform.
            </h3>

            <p className="text-gray-300 leading-8">
              Everything you need to become interview-ready—from learning and
              practicing to competing and improving.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}