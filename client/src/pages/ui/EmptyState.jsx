
//created by piyush

export default function EmptyState({ message, className = '' }) {
  return (
    <div className={`flex items-center justify-center h-full min-h-[200px] ${className}`}>
      <p className="text-sm text-[var(--text)] opacity-60">{message}</p>
    </div>
  );
}
