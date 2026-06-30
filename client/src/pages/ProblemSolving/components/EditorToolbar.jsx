import { FaList, FaRedo } from 'react-icons/fa';
import { LANGUAGE_OPTIONS } from '../config';

/**
 * EditorToolbar Component
 * Handles all toolbar controls: problem list, run, submit, language selection, reset
 */
export default function EditorToolbar({
  language,
  onLanguageChange,
  onReset,
  onProblemListClick,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting,
}) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)] p-3 bg-[var(--code-bg)]">
      {/* Left: Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onProblemListClick}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded hover:opacity-90 transition-opacity"
          type="button"
        >
          <FaList />
          <span>Problem List</span>
        </button>

        <button
          onClick={onRun}
          disabled={isRunning || isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          type="button"
        >
          {isRunning ? 'Running...' : 'Run'}
        </button>

        <button
          onClick={onSubmit}
          disabled={isRunning || isSubmitting}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          type="button"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {/* Right: Language & Reset */}
      <div className="flex items-center gap-3">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="px-3 py-1.5 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm cursor-pointer"
        >
          {LANGUAGE_OPTIONS.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <button
          onClick={onReset}
          className="p-2 rounded hover:bg-[var(--accent-bg)] text-[var(--text)] transition-colors"
          title="Reset Code"
          type="button"
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
}
