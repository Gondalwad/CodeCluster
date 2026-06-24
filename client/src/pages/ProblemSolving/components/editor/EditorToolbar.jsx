import { useState } from 'react';
import { FaExpand, FaCompress, FaRedo } from 'react-icons/fa';
import LanguageSelector from './LanguageSelector';

export default function EditorToolbar({ 
  language, 
  onLanguageChange, 
  onReset,
  showReset = true 
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--code-bg)]">
      <h3 className="text-base font-semibold text-[var(--text-h)]">
        Code Editor
      </h3>
      
      <div className="flex items-center gap-3">
        <LanguageSelector 
          language={language} 
          onChange={onLanguageChange} 
        />
        
        {showReset && (
          <button
            onClick={onReset}
            className="p-2 rounded hover:bg-[var(--accent-bg)] text-[var(--text)] transition-colors"
            title="Reset Code"
          >
            <FaRedo className="text-sm" />
          </button>
        )}
      </div>
    </div>
  );
}
