import { DIFFICULTY_COLORS } from '../constants';

export default function ProblemMetadata({ difficulty = "Medium", acceptance = "45.2%", submissions = "1.2M" }) {
  const difficultyColor = DIFFICULTY_COLORS[difficulty.toLowerCase()] || 'text-[var(--text)]';

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text)]">
      <div className="flex items-center gap-2">
        <span className="font-medium">Difficulty:</span>
        <span className={`font-semibold ${difficultyColor}`}>
          {difficulty}
        </span>
      </div>
      <span className="text-[var(--border)]">|</span>
      <div className="flex items-center gap-2">
        <span className="font-medium">Acceptance:</span>
        <span>{acceptance}</span>
      </div>
      <span className="text-[var(--border)]">|</span>
      <div className="flex items-center gap-2">
        <span className="font-medium">Submissions:</span>
        <span>{submissions}</span>
      </div>
    </div>
  );
}
