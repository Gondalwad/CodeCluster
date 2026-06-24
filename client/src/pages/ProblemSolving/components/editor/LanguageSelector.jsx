export default function LanguageSelector({ language, onChange }) {
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' }
  ];

  return (
    <select
      value={language}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1.5 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
