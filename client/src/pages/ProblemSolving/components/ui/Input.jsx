export default function Input({ type = 'text', className, placeholder, value, onChange, name }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`rounded-lg bg-[var(--code-bg)] text-[var(--text)] placeholder:text-[var(--text)] placeholder:opacity-50 border border-[var(--border)] px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${className}`}
    />
  );
}
