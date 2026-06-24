/**
 * ConsoleOutputPanel Component
 * Displays console output from code execution
 */
export default function ConsoleOutputPanel({ 
  output = null, 
  isRunning = false 
}) {
  if (isRunning) {
    return (
      <div className="flex items-center justify-center h-full min-h-[150px] bg-[var(--code-bg)]">
        <p className="text-sm text-[var(--text)] opacity-60">Running...</p>
      </div>
    );
  }

  if (!output) {
    return null;
  }

  return (
    <div className="h-full bg-[var(--code-bg)] p-3 overflow-auto">
      <pre className="font-[var(--mono)] text-sm text-[var(--text)] whitespace-pre-wrap break-words">
        {output}
      </pre>
    </div>
  );
}
