import ProblemSidebar from "./components/ProblemSidebar";
import ProblemWorkspace from "./components/ProblemWorkspace";

export default function ProblemSolving() {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      <ProblemSidebar />
      <ProblemWorkspace />
    </div>
  );
}
