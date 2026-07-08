export default function ProblemSidebar() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[var(--text-h)] mb-6">
        Problem List
      </h2>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search problems..."
          className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] placeholder:text-[var(--text)] placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
        />
      </div>
      
      {/* Placeholder for problem list */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            className="group p-4 border border-[var(--border)] rounded-lg hover:bg-[var(--accent-bg)] hover:border-[var(--accent)] cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-[var(--text-h)] group-hover:text-[var(--accent)] transition-colors">
                {num}. Problem Title {num}
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-medium">
                Easy
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-[var(--text)]">
              <span>Acceptance: 45.2%</span>
              <span className="text-[var(--border)]">•</span>
              <span>Difficulty: Easy</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
