export default function ProblemHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)] p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-semibold text-[var(--text-h)] mb-2">
            Problem Title
          </h1>
          <div className="flex flex-wrap gap-2 items-center text-sm text-[var(--text)]">
            <span className="px-3 py-1 rounded-full bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)]">
              Difficulty
            </span>
            <span>•</span>
            <span>Category</span>
            <span>•</span>
            <span>Success Rate</span>
          </div>
        </div>
      </div>
    </header>
  );
}
