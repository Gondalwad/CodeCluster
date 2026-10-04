//created by piyush

export default function Textarea({ className, placeholder, value, onChange, name, rows = 4 }) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`rounded-lg bg-[var(--code-bg)] text-[var(--text)] placeholder:text-[var(--text)] placeholder:opacity-50 border border-[var(--border)] px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent resize-none ${className}`}
    />
  );
}
