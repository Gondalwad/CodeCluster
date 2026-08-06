import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExamInstructions from "./ExamInstructions";
import ProctoringSession from "../../proctoring/ProctoringSession";

export default function ExamSession({ candidateId = "demo-candidate" }) {
  const [examStarted, setExamStarted] = useState(false);
  const navigate = useNavigate();

  if (!examStarted) {
    return <ExamInstructions onStart={() => setExamStarted(true)} />;
  }

  return (
    <ProctoringSession
      candidateId={candidateId}
      enabled
      onGoHome={() => navigate("/")}
    >
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
        <p className="text-[var(--text)]">Exam content placeholder</p>
      </div>
    </ProctoringSession>
  );
}
