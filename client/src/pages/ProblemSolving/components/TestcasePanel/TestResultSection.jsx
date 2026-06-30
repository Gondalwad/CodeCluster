import { CodeBlock, EmptyState, Spinner } from '../../../../components/ui';

export default function TestResultSection() {
  const hasResult = false;
  const isRunning = false;
  
  const dummyResult = {
    status: 'Accepted',
    passed: 3,
    total: 3,
    input: 'nums = [2,7,11,15]\ntarget = 9',
    output: '[0,1]',
    expected: '[0,1]',
    runtime: '68 ms',
    memory: '44.2 MB'
  };

  if (isRunning) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px]">
        <div className="text-center space-y-3">
          <Spinner size="md" className="mb-3 mx-auto" />
          <p className="text-sm text-[var(--text)] font-medium">Running test cases...</p>
        </div>
      </div>
    );
  }

  if (!hasResult) {
    return <EmptyState message="You must run your code first." />;
  }

  const isAccepted = dummyResult.status === 'Accepted';

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Status Header */}
      <div className={`p-4 border-b border-[var(--border)] ${
        isAccepted ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'
      }`}>
        <span className={`text-lg font-bold ${
          isAccepted ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {dummyResult.status}
        </span>
        <p className="text-sm text-[var(--text)] mt-1">
          {dummyResult.passed} / {dummyResult.total} test cases passed
        </p>
      </div>

      {/* Result Details */}
      <div className="flex-1 p-4 space-y-4 bg-[var(--bg)]">
        <CodeBlock label="Input:">{dummyResult.input}</CodeBlock>
        <CodeBlock label="Your Output:">{dummyResult.output}</CodeBlock>
        <CodeBlock label="Expected Output:">{dummyResult.expected}</CodeBlock>

        {/* Runtime Info */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-3 bg-[var(--code-bg)] rounded-lg border border-[var(--border)] shadow-sm">
            <p className="text-xs text-[var(--text)] opacity-70 mb-1">Runtime</p>
            <p className="text-base font-semibold text-[var(--text-h)]">{dummyResult.runtime}</p>
          </div>
          <div className="p-3 bg-[var(--code-bg)] rounded-lg border border-[var(--border)] shadow-sm">
            <p className="text-xs text-[var(--text)] opacity-70 mb-1">Memory</p>
            <p className="text-base font-semibold text-[var(--text-h)]">{dummyResult.memory}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
