import { useState } from 'react';
import { Button, CodeBlock } from '../../../../components/ui';

export default function TestcaseSection() {
  const [activeCase, setActiveCase] = useState(0);

  const testCases = [
    { input: 'nums = [2,7,11,15]\ntarget = 9', output: '[0,1]' },
    { input: 'nums = [3,2,4]\ntarget = 6', output: '[1,2]' },
    { input: 'nums = [3,3]\ntarget = 6', output: '[0,1]' }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Case Selector Tabs */}
      <div className="flex gap-2 p-3 border-b border-[var(--border)] bg-[var(--bg)] overflow-x-auto">
        {testCases.map((_, index) => (
          <Button
            key={index}
            value={`Case ${index + 1}`}
            onClick={() => setActiveCase(index)}
            className={`!py-1.5 !px-4 text-sm whitespace-nowrap ${
              activeCase === index
                ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                : 'bg-[var(--code-bg)] border-[var(--border)] text-[var(--text)] hover:bg-[var(--accent-bg)]'
            }`}
          />
        ))}
      </div>

      {/* Case Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
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
