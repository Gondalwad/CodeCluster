//created by piyush

export default function CodeBlock({ children, label, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-xs font-semibold text-[var(--text-h)] mb-2">
          {label}
        </label>
      )}
      <div className="bg-[var(--code-bg)] border border-[var(--border)] rounded-lg p-3">
        <pre className="font-[var(--mono)] text-sm text-[var(--text)] whitespace-pre-wrap break-words m-0">
          {children}
        </pre>
      </div>
    </div>
  );
}
