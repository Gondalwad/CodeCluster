import { useState } from 'react';
import VerticalResizablePanel from './VerticalResizablePanel';
import EditorToolbar from './EditorToolbar';
import { CodeEditor } from './editor';
import TestCasePanel from './TestcasePanel';
import ConsoleOutputPanel from './ConsoleOutputPanel';
import { LANGUAGE_DEFAULTS } from '../config';

/**
 * EditorSection Component
 * Orchestrates the editor UI with toolbar, code editor, and test results
 * Manages code execution state and language selection
 */
export default function EditorSection({ testCases = [], onToggleProblemList }) {
  // State Management
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(LANGUAGE_DEFAULTS.javascript);
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
      setOutput('Test cases passed: 0/3\n\nPlaceholder for execution results.');
    }, 1000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOutput('Submission successful!\n\nPlaceholder for submission results.');
    }, 1500);
  };

  const handleCloseOutput = () => {
    setOutput(null);
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
          code={code}
          onChange={setCode}
          disabled={isRunning}
        />
      </div>
    </div>
  );

  // Shared test section
  const testContent = (
    <div className="h-full flex flex-col bg-[var(--bg)] overflow-hidden">
      <div className={`${output || isRunning ? 'flex-1' : 'h-full'} overflow-auto`}>
        <TestCasePanel testCases={testCases} />
      </div>
      {(output || isRunning) && (
        <div className="flex-1 overflow-auto border-t border-[var(--border)]">
          <ConsoleOutputPanel output={output} isRunning={isRunning} onClose={handleCloseOutput} />
        </div>
      )}
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
