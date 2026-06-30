import { CodeEditor } from './editor';

/**
 * EditorContainer Component
 * Focused component that wraps the Monaco code editor
 * Handles only code display and basic editor interactions
 */
export default function EditorContainer({
  language,
  code,
  onChange,
  isRunning,
}) {
  return (
    <div className="flex-1 overflow-hidden">
      <CodeEditor
        language={language}
        code={code}
        onChange={onChange}
        disabled={isRunning}
      />
    </div>
  );
}
