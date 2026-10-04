import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function ProblemDrawer({ isOpen, onClose, children }) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-40 
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[600px] max-w-[90vw]
          bg-[var(--bg)] shadow-2xl z-50 border-r border-[var(--border)]
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--accent-bg)] text-[var(--text)] hover:text-[var(--accent)] transition-all duration-200 z-10 shadow-sm"
          aria-label="Close"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Content */}
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}
