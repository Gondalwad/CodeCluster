import { useState } from 'react';
import VerticalResizablePanel from './VerticalResizablePanel';
import EditorToolbar from './EditorToolbar';
import EditorContainer from './EditorContainer';
import TestResultsContainer from './TestResultsContainer';
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

  // Sections
  const editorSection = (
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
      <EditorContainer
        language={language}
        code={code}
        onChange={setCode}
        isRunning={isRunning}
      />
    </div>
  );

  const testSection = (
    <div className="h-full flex flex-col bg-[var(--bg)] overflow-hidden">
      <TestResultsContainer
        testCases={testCases}
        output={output}
        isRunning={isRunning}
      />
    </div>
  );

  return (
    <div className="h-full">
      {/* Desktop: Vertical resizing */}
      <div className="hidden md:block h-full">
        <VerticalResizablePanel
          top={editorSection}
          bottom={testSection}
          defaultTopHeight={60}
          minTopHeight={200}
          minBottomHeight={200}
        />
      </div>

      {/* Mobile: Stacked */}
      <div className="md:hidden h-full flex flex-col">
        <div className="flex-1">{editorSection}</div>
        <div className="h-[400px]">{testSection}</div>
      </div>
    </div>
  );
}
