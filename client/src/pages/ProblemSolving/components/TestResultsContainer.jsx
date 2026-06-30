import TestCasePanel from './TestcasePanel';
import ConsoleOutputPanel from './ConsoleOutputPanel';

/**
 * TestResultsContainer Component
 * Displays test cases and execution results/console output
 * Handles the vertical split between test cases and output
 */
export default function TestResultsContainer({
  testCases = [],
  output,
  isRunning,
}) {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Test Cases */}
      <div className="flex-1 overflow-auto">
        <TestCasePanel testCases={testCases} />
      </div>

      {/* Console Output */}
      <div className="flex-1 overflow-auto border-t border-[var(--border)]">
        <ConsoleOutputPanel output={output} isRunning={isRunning} />
      </div>
    </div>
  );
}
