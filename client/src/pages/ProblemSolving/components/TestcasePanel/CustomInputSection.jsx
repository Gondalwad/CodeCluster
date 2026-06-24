import { useState } from 'react';
import { Textarea } from '../../../../components/ui';

export default function CustomInputSection() {
  const [customInput, setCustomInput] = useState('');

  return (
    <div className="flex flex-col h-full p-4">
      <label className="block text-xs font-semibold text-[var(--text-h)] mb-2">
        Enter your custom input:
      </label>
      <Textarea
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder="Enter test case input here..."
        className="flex-1 min-h-[200px] font-[var(--mono)] text-sm"
      />
      <p className="text-xs text-[var(--text)] mt-2 opacity-70">
        Enter custom test input in the format expected by the function.
      </p>
    </div>
  );
}
