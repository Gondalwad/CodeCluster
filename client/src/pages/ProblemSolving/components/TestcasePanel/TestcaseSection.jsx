import { useState } from 'react';
import { Button, CodeBlock } from '../ui';

export default function TestcaseSection({ testCases = [] }) {
  const [activeCase, setActiveCase] = useState(0);

  if (testCases.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-sm text-[var(--text)] opacity-60">No test cases available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Case Selector Tabs */}
      <div className="flex gap-2 p-3 border-b border-[var(--border)] bg-[var(--bg)] overflow-x-auto">
        {testCases.map((_, index) => (
          <Button
            key={index}
            value={`Case ${index + 1}`}
            onClick={() => setActiveCase(index)}
            className={`!py-2 !px-4 text-sm whitespace-nowrap font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
              activeCase === index
                ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                : 'bg-[var(--code-bg)] border-[var(--border)] text-[var(--text)] hover:bg-[var(--accent-bg)] hover:border-[var(--accent)]'
            }`}
          />
        ))}
      </div>

      {/* Case Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[var(--bg)]">
        <CodeBlock label="Input:">
          {testCases[activeCase]?.input || 'No input provided'}
        </CodeBlock>
        <CodeBlock label="Expected Output:">
          {testCases[activeCase]?.output || 'No output provided'}
        </CodeBlock>
      </div>
    </div>
  );
}
