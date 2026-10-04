//Developed by Urvashi
import Button from "../../ui/Button";

const CTA = () => {
  return (
    <section className="bg-[#09090B] py-28">

      <div className="max-w-5xl mx-auto px-6">

        <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-600/10 to-blue-600/10 p-12 text-center">

          <h2 className="text-4xl font-bold text-white leading-tight">

            Start Building Your
            <br />
            Coding Journey Today.

          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-zinc-400 leading-8">

            Whether you're a student improving your coding
            skills or an institute conducting assessments,
            CodeCluster provides everything you need on one
            intelligent platform.

          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Button value="Get Started" />

            <Button value="Learn More"/>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CTA;