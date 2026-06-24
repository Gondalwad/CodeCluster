export default function TabButton({ active = false, onClick, children, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-3 text-sm font-medium transition-all relative border-b-2
        ${
          active
            ? 'text-[var(--accent)] border-[var(--accent)] bg-transparent'
            : 'text-[var(--text)] border-transparent hover:text-[var(--text-h)] hover:bg-[var(--accent-bg)]'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}
