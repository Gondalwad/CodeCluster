import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function ProblemSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Tablet/Mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-20 left-4 z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-lg hover:bg-indigo-500 transition-colors"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`
          fixed lg:static
          top-16 left-0
          h-[calc(100vh-4rem)] lg:h-auto
          w-64 lg:w-80
          border-r border-[var(--border)]
          bg-[var(--bg)]
          transition-transform duration-300 ease-in-out
          z-40
          overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold text-[var(--text-h)] mb-4">
            Problem List
          </h2>
          <p className="text-sm text-[var(--text)]">
            Problem list will be displayed here.
          </p>
        </div>
      </aside>
    </>
  );
}
