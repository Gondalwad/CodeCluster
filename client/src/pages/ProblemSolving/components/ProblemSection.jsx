import { DIFFICULTY_COLORS } from '../config';

export default function ProblemSection({ 
  title = "Problem Title",
  difficulty = "Medium",
  acceptance = "0%",
  submissions = "0",
  tags = [],
  description = "",
  examples = [],
  constraints = []
}) {
  const difficultyColor = DIFFICULTY_COLORS[difficulty.toLowerCase()] || 'text-[var(--text)]';

  return (
    <div className="h-full flex flex-col border border-[var(--border)] rounded-lg bg-[var(--bg)] overflow-hidden shadow-sm">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--bg)] p-4 space-y-3 backdrop-blur-sm bg-opacity-95">
        <h2 className="text-2xl font-bold text-[var(--text-h)]">{title}</h2>
        
        {/* Metadata */}
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

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Scrollable Content - Problem Statement */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6 text-[var(--text)]">
          {/* Description */}
          <div className="text-sm leading-relaxed">
            <p className="text-base">{description}</p>
          </div>

          {/* Examples */}
          {examples.length > 0 && (
            <div>
              <h4 className="font-semibold text-[var(--text-h)] mb-3 text-lg">Examples:</h4>
              <div className="space-y-4">
                {examples.map((example, index) => (
                  <div
                    key={index}
                    className="bg-[var(--code-bg)] p-4 rounded-lg border border-[var(--border)] font-[var(--mono)] text-sm shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="mb-2">
                      <span className="font-semibold text-[var(--accent)]">Input:</span>{' '}
                      <span className="text-[var(--text-h)]">{example.input}</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold text-[var(--accent)]">Output:</span>{' '}
                      <span className="text-[var(--text-h)]">{example.output}</span>
                    </div>
                    {example.explanation && (
                      <div className="mt-2 pt-2 border-t border-[var(--border)]">
                        <span className="font-semibold text-[var(--accent)]">Explanation:</span>{' '}
                        <span className="text-[var(--text)]">{example.explanation}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Constraints */}
          {constraints.length > 0 && (
            <div>
              <h4 className="font-semibold text-[var(--text-h)] mb-3 text-lg">Constraints:</h4>
              <ul className="list-none space-y-2 font-[var(--mono)] text-sm">
                {constraints.map((constraint, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[var(--accent)] mt-1">•</span>
                    <span className="text-[var(--text)]">{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
