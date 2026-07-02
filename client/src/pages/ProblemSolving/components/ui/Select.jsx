export default function Select({ value, onChange, options = [], className = '', placeholder = 'Select...' }) {
  return (
    <select
      value={value}
      onChange={onChange}
      // className={`px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all ${className}`}
      className={`px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all ${className}`}

    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
