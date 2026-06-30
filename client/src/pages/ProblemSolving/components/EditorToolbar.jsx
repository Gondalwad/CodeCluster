import { FaList, FaRedo } from 'react-icons/fa';
import { LANGUAGE_OPTIONS } from '../config';
import { LoadingSpinner } from '../../../components/ui';

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
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] p-3 bg-[var(--code-bg)] shadow-sm">
      {/* Left: Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onProblemListClick}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
          type="button"
        >
          <FaList className="text-sm" />
          <span className="hidden sm:inline">Problem List</span>
        </button>

        <button
          onClick={onRun}
          disabled={isRunning || isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md font-medium"
          type="button"
        >
          {isRunning ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              <span className="hidden sm:inline">Running...</span>
              <span className="sm:hidden">Run...</span>
            </span>
          ) : 'Run'}
        </button>

        <button
          onClick={onSubmit}
          disabled={isRunning || isSubmitting}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md font-medium"
          type="button"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              <span className="hidden sm:inline">Submitting...</span>
              <span className="sm:hidden">Submit...</span>
            </span>
          ) : 'Submit'}
        </button>
      </div>

      {/* Right: Language & Reset */}
      <div className="flex items-center gap-3">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all shadow-sm hover:shadow-md"
        >
          {LANGUAGE_OPTIONS.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <button
          onClick={onReset}
          className="p-2 rounded-lg hover:bg-[var(--accent-bg)] text-[var(--text)] hover:text-[var(--accent)] transition-all duration-200 shadow-sm hover:shadow-md"
          title="Reset Code"
          type="button"
        >
          <FaRedo className="text-base" />
        </button>
      </div>
    </div>
  );
}
