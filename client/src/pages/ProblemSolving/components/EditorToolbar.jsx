import { FaList, FaRedo } from 'react-icons/fa';
import { LANGUAGE_OPTIONS } from '../config';
import { LoadingSpinner , Select} from './ui/index.js';
// import

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
    <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] px-2 py-1.5 sm:p-3 bg-[var(--code-bg)] shadow-sm">
      {/* Left: Action Buttons */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={onProblemListClick}
          className="flex items-center gap-1 px-2 py-1 sm:px-4 sm:py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm font-medium text-xs sm:text-sm"
          type="button"
        >
          <FaList className="text-xs sm:text-sm" />
          <span className="hidden sm:inline">Problem List</span>
        </button>

        <button
          onClick={onRun}
          disabled={isRunning || isSubmitting}
          className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm font-medium"
          type="button"
        >
          {isRunning ? (
            <span className="flex items-center gap-1">
              <LoadingSpinner size="sm" />
              <span className="hidden sm:inline">Running...</span>
            </span>
          ) : 'Run'}
        </button>

        <button
          onClick={onSubmit}
          disabled={isRunning || isSubmitting}
          className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm font-medium"
          type="button"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-1">
              <LoadingSpinner size="sm" />
              <span className="hidden sm:inline">Submitting...</span>
            </span>
          ) : 'Submit'}
        </button>
      </div>

      {/* Right: Language & Reset */}
      <div className="flex items-center gap-1 sm:gap-3">
        <Select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          options={LANGUAGE_OPTIONS}
          placeholder={null}
          // className="px-1 py-1 text-[10px] sm:text-sm sm:px-3 sm:py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all max-w-[72px] sm:max-w-none"
            className="text-[10px] sm:text-sm px-1 py-1 sm:px-3 sm:py-2 max-w-[72px] sm:max-w-none rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"

        />
          {/* {LANGUAGE_OPTIONS.map((lang) => (
            <option key={lang.value} value={lang.value} className="text-xs sm:text-sm">
              {lang.label}
            </option>
          ))}
        </select> */}

        <button
          onClick={onReset}
          className="p-1 sm:p-2 rounded-lg hover:bg-[var(--accent-bg)] text-[var(--text)] hover:text-[var(--accent)] transition-all duration-200"
          title="Reset Code"
          type="button"
        >
          <FaRedo className="text-xs sm:text-base" />
        </button>
      </div>
    </div>
  );
}
