import { useState } from 'react';
import Button from "../../../components/ui/Button";
import { CodeEditor, EditorToolbar } from './editor';

const DEFAULT_CODE = {
  javascript: '// Write your JavaScript solution here\nfunction solution() {\n  \n}',
  python: '# Write your Python solution here\ndef solution():\n    pass',
  java: '// Write your Java solution here\nclass Solution {\n    public void solution() {\n        \n    }\n}',
  cpp: '// Write your C++ solution here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}',
  c: '// Write your C solution here\n#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
  typescript: '// Write your TypeScript solution here\nfunction solution(): void {\n  \n}',
  go: '// Write your Go solution here\npackage main\n\nfunc main() {\n    \n}',
  rust: '// Write your Rust solution here\nfn main() {\n    \n}'
};

export default function ProblemContentContainer() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(DEFAULT_CODE.javascript);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(DEFAULT_CODE[newLanguage] || '');
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleReset = () => {
    setCode(DEFAULT_CODE[language] || '');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4 h-full overflow-hidden">
      {/* Problem Statement Section */}
      <section className="border border-[var(--border)] rounded-lg bg-[var(--bg)] overflow-y-auto">
        <div className="border-b border-[var(--border)] p-3 bg-[var(--code-bg)]">
          <h3 className="text-lg font-semibold text-[var(--text-h)]">
            Problem Statement
          </h3>
        </div>
        <div className="p-4 text-[var(--text)]">
          <p className="mb-4">Problem description will appear here.</p>
          
          <div className="mb-4">
            <h4 className="font-semibold text-[var(--text-h)] mb-2">Examples:</h4>
            <div className="bg-[var(--code-bg)] p-3 rounded border border-[var(--border)] font-[var(--mono)] text-sm">
              <p>Example test cases will be displayed here.</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-[var(--text-h)] mb-2">Constraints:</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Constraint items will be listed here</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Code Editor & Test Cases Section */}
      <section className="border border-[var(--border)] rounded-lg bg-[var(--bg)] flex flex-col overflow-hidden">
        <EditorToolbar
          language={language}
          onLanguageChange={handleLanguageChange}
          onReset={handleReset}
        />
        
        {/* Monaco Code Editor */}
        <div className="flex-1 overflow-hidden">
          <CodeEditor
            language={language}
            value={code}
            onChange={handleCodeChange}
          />
        </div>

        {/* Test Cases & Submit Section */}
        <div className="border-t border-[var(--border)] p-3 bg-[var(--code-bg)]">
          <div className="flex gap-2 mb-3">
            <Button value="Run Tests" className="bg-[var(--accent)] border-[var(--accent)]" />
            <Button value="Submit" />
          </div>
          <div className="text-sm text-[var(--text)]">
            <p>Test results will appear here.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
