export default function ProblemTags({ tags = [] }) {
  // Default dummy tags if none provided
  const displayTags = tags.length > 0 ? tags : ['Array', 'Hash Table', 'Dynamic Programming'];

  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 text-xs rounded-full bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)] hover:bg-[var(--accent-border)] transition-colors cursor-pointer"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
