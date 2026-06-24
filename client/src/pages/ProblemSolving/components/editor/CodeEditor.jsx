import { memo, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from './useTheme';

const CodeEditor = memo(({ 
  language = 'javascript',
  value = '',
  onChange,
  readOnly = false,
  height = '100%',
  width = '100%'
}) => {
  const theme = useTheme();
  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs';

  const handleEditorChange = useCallback((value) => {
    if (onChange) {
      onChange(value || '');
    }
  }, [onChange]);

  const editorOptions = {
    fontSize: 14,
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    tabSize: 2,
    formatOnPaste: true,
    formatOnType: true,
    readOnly,
    lineNumbers: 'on',
    folding: true,
    bracketPairColorization: {
      enabled: true
    },
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    autoIndent: 'full',
    matchBrackets: 'always',
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto',
      useShadows: false,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10
    },
    fontFamily: 'ui-monospace, Consolas, monospace',
    padding: { top: 16, bottom: 16 }
  };

  return (
    <div className="h-full w-full bg-[var(--code-bg)] overflow-hidden">
      <Editor
        height={height}
        width={width}
        language={language}
        value={value}
        onChange={handleEditorChange}
        theme={monacoTheme}
        options={editorOptions}
        loading={
          <div className="flex items-center justify-center h-full text-[var(--text)]">
            Loading editor...
          </div>
        }
      />
    </div>
  );
});

CodeEditor.displayName = 'CodeEditor';

export default CodeEditor;
