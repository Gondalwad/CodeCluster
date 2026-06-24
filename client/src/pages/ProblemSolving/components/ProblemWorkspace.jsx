import ProblemHeader from "./ProblemHeader";
import ProblemContentContainer from "./ProblemContentContainer";

export default function ProblemWorkspace() {
  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[var(--bg)]">
      <ProblemHeader />
      <ProblemContentContainer />
    </main>
  );
}
