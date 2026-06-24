export default function ProblemSidebar() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-[var(--text-h)] mb-6">
        Problem List
      </h2>
      
      {/* Placeholder for problem list */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            className="p-4 border border-[var(--border)] rounded hover:bg-[var(--accent-bg)] cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-[var(--text-h)]">
                {num}. Problem Title {num}
              </h3>
              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                Easy
              </span>
            </div>
            <p className="text-sm text-[var(--text)]">
              Acceptance: 45.2%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
