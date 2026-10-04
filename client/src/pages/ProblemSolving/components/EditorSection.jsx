import { useState } from 'react';
import VerticalResizablePanel from './VerticalResizablePanel';
import EditorToolbar from './EditorToolbar';
import { CodeEditor } from './editor';
import TestCasePanel from './TestcasePanel';
import { LANGUAGE_DEFAULTS } from '../config';

/**
 * EditorSection Component
 * Orchestrates the editor UI with toolbar, code editor, and test results
 * Manages code execution state and language selection
 */
export default function EditorSection({ testCases = [], onToggleProblemList }) {
  // State Management
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(LANGUAGE_DEFAULTS.cpp);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState(null);

  // Handlers
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(LANGUAGE_DEFAULTS[newLanguage] || '');
  };

  const handleReset = () => {
    setCode(LANGUAGE_DEFAULTS[language] || '');
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setOutput({ status: 'Accepted', passed: 2, total: 3, input: 'nums = [2,7,11,15]\ntarget = 9', output: '[0,1]', expected: '[0,1]', runtime: '68 ms', memory: '44.2 MB' });
    }, 1000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOutput({ status: 'Accepted', passed: 3, total: 3, input: 'nums = [2,7,11,15]\ntarget = 9', output: '[0,1]', expected: '[0,1]', runtime: '68 ms', memory: '44.2 MB' });
    }, 1500);
  };

  // Shared editor section
  const editorContent = (
    <div className="h-full flex flex-col bg-[var(--bg)] overflow-hidden">
      <EditorToolbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onReset={handleReset}
        onProblemListClick={onToggleProblemList}
        onRun={handleRun}
        onSubmit={handleSubmit}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
      />
      <div className="flex-1 overflow-hidden">
        <CodeEditor
          language={language}
          value={code}
          onChange={setCode}
          readOnly={isRunning}
        />
      </div>
    </div>
  );

  // Shared test section
  const testContent = (
    <div className="h-full flex flex-col bg-[var(--bg)] overflow-hidden">
      <TestCasePanel testCases={testCases} output={output} isRunning={isRunning} />
    </div>
  );

  return (
    <div className="h-full">
      {/* Desktop: Vertical resizing */}
      <div className="hidden md:block h-full">
        <VerticalResizablePanel
          top={editorContent}
          bottom={testContent}
          defaultTopHeight={60}
          minTopHeight={200}
          minBottomHeight={200}
        />
      </div>

      {/* Mobile: Stacked */}
      <div className="md:hidden h-full flex flex-col">
        <div className="flex-1">{editorContent}</div>
        <div className="h-[400px]">{testContent}</div>
      </div>
    </div>
  );
}
