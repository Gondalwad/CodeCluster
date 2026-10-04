import ProblemContentContainer from "./components/ProblemContentContainer";

export default function ProblemSolving() {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-[var(--bg)] lg:overflow-hidden overflow-auto">
      <ProblemContentContainer />
    </div>
  );
}
