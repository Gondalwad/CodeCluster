import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExamInstructions from "./ExamInstructions";
import ProctoringSession from "../../proctoring/ProctoringSession";

export default function ExamSession({ candidateId = "demo-candidate" }) {
  const [examStarted, setExamStarted] = useState(false);
  const [examEnded, setExamEnded] = useState(false);
  const navigate = useNavigate();

  const handleTerminate = () => {
    setExamEnded(true);
    setTimeout(() => navigate("/exam"), 3000);
  };

  if (!examStarted) {
    return <ExamInstructions onStart={() => setExamStarted(true)} />;
  }

  return (
    <ProctoringSession
      candidateId={candidateId}
      enabled={!examEnded}
      onTerminate={handleTerminate}
    >
      {/* Exam content goes here */}
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
        <p className="text-[var(--text)]">Exam content placeholder</p>
      </div>
    </ProctoringSession>
  );
}
