import { LANGUAGE_OPTIONS } from '../../constants';

export default function LanguageSelector({ language, onChange }) {
  return (
    <select
      value={language}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
    >
      {LANGUAGE_OPTIONS.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
