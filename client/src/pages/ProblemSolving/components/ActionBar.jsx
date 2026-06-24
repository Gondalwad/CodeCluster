/**
 * ActionBar Component
 * Displays Run and Submit buttons with loading states
 */
export default function ActionBar({ 
  onRun, 
  onSubmit, 
  isRunning = false, 
  isSubmitting = false 
}) {
  return (
    <div className="flex gap-3 p-3 bg-[var(--code-bg)]">
      <button
        onClick={onRun}
        disabled={isRunning || isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isRunning ? 'Running...' : 'Run'}
      </button>
      <button
        onClick={onSubmit}
        disabled={isRunning || isSubmitting}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}
