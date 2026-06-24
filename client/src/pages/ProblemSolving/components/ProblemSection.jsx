import ProblemMetadata from './ProblemMetadata';
import ProblemTags from './ProblemTags';
import ProblemStatement from './ProblemStatement';

export default function ProblemSection({ 
  title = "1. Two Sum",
  difficulty = "Easy",
  acceptance = "49.1%",
  submissions = "2.5M",
  tags = [],
  description = "",
  examples = [],
  constraints = []
}) {
  return (
    <div className="h-full flex flex-col border border-[var(--border)] rounded-lg bg-[var(--bg)] overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--bg)] p-4 space-y-3">
        <h2 className="text-2xl font-bold text-[var(--text-h)]">{title}</h2>
        <ProblemMetadata 
          difficulty={difficulty}
          acceptance={acceptance}
          submissions={submissions}
        />
        <ProblemTags tags={tags} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <ProblemStatement
          description={description}
          examples={examples}
          constraints={constraints}
        />
      </div>
    </div>
  );
}
