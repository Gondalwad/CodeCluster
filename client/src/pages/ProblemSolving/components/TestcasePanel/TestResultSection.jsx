import { CodeBlock, EmptyState, LoadingSpinner } from '../../../ui';

export default function TestResultSection({ output = null, isRunning = false }) {
  if (isRunning) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px]">
        <div className="text-center space-y-3">
          <LoadingSpinner size="md" className="mb-3 mx-auto" />
          <p className="text-sm text-[var(--text)] font-medium">Running test cases...</p>
        </div>
      </div>
    );
  }

  if (!output) {
    return <EmptyState message="You must run your code first." />;
  }

  const isAccepted = output.status === 'Accepted';

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Status Header */}
      <div className={`p-4 border-b border-[var(--border)] ${
        isAccepted ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'
      }`}>
        <span className={`text-lg font-bold ${
          isAccepted ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {output.status}
        </span>
        <p className="text-sm text-[var(--text)] mt-1">
          {output.passed} / {output.total} test cases passed
        </p>
      </div>

      {/* Result Details */}
      <div className="flex-1 p-4 space-y-4 bg-[var(--bg)]">
        <CodeBlock label="Input:">{output.input}</CodeBlock>
        <CodeBlock label="Your Output:">{output.output}</CodeBlock>
        <CodeBlock label="Expected Output:">{output.expected}</CodeBlock>

        {/* Runtime Info */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-3 bg-[var(--code-bg)] rounded-lg border border-[var(--border)] shadow-sm">
            <p className="text-xs text-[var(--text)] opacity-70 mb-1">Runtime</p>
            <p className="text-base font-semibold text-[var(--text-h)]">{output.runtime}</p>
          </div>
          <div className="p-3 bg-[var(--code-bg)] rounded-lg border border-[var(--border)] shadow-sm">
            <p className="text-xs text-[var(--text)] opacity-70 mb-1">Memory</p>
            <p className="text-base font-semibold text-[var(--text-h)]">{output.memory}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
