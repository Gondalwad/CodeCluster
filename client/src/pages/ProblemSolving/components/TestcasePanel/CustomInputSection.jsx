import { useState } from 'react';
import { Textarea } from '../../../../components/ui';

export default function CustomInputSection() {
  const [customInput, setCustomInput] = useState('');

  return (
    <div className="flex flex-col h-full p-4 bg-[var(--bg)] space-y-3">
      <label className="block text-sm font-semibold text-[var(--text-h)]">
        Enter your custom input:
      </label>
      <Textarea
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder="Enter test case input here...\n\nExample:\nnums = [2,7,11,15]\ntarget = 9"
        className="flex-1 min-h-[200px] font-[var(--mono)] text-sm shadow-sm"
      />
      <div className="flex items-start gap-2">
        <span className="text-[var(--accent)] mt-0.5">💡</span>
        <p className="text-xs text-[var(--text)] opacity-80">
          Enter custom test input in the format expected by the function.
        </p>
      </div>
    </div>
  );
}
