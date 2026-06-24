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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[600px] max-w-[90vw]
          bg-[var(--bg)] shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--accent-bg)] text-[var(--text)] transition-colors"
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
