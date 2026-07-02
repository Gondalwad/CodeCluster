import { FaTimes } from 'react-icons/fa';
import { LoadingSpinner } from './ui';

/**
 * ConsoleOutputPanel Component
 * Displays console output from code execution
 */
export default function ConsoleOutputPanel({ 
  output = null, 
  isRunning = false,
  onClose
}) {
  const header = (
    <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)]">
      <h4 className="text-xs font-semibold text-[var(--text-h)] uppercase tracking-wider">Console Output</h4>
      <button
        onClick={onClose}
        className="p-1 rounded hover:bg-[var(--accent-bg)] text-[var(--text)] hover:text-[var(--accent)] transition-all"
        aria-label="Close"
      >
        <FaTimes className="text-sm" />
      </button>
    </div>
  );

  if (isRunning) {
    return (
      <div className="flex flex-col h-full bg-[var(--code-bg)] border-t border-[var(--border)]">
        {header}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex items-center gap-3">
            <LoadingSpinner size="md" className="text-[var(--accent)]" />
            <p className="text-sm text-[var(--text)] font-medium">Running your code...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!output) {
    return null;
  }

  return (
    <div className="h-full flex flex-col bg-[var(--code-bg)] border-t border-[var(--border)]">
      {header}
      <div className="flex-1 p-4 overflow-auto">
        <pre className="font-[var(--mono)] text-sm text-[var(--text)] whitespace-pre-wrap break-words">
          {output}
        </pre>
      </div>
    </div>
  );
}
