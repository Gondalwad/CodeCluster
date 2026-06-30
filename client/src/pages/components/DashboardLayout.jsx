// Developed By sudarshan Gondalwad
// defines reuable layout for different pages/components like examAttempt, user and admin dashboard.

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";

/**
 * DashboardLayout — Reusable shell for all role-based dashboards.
 *
 * Props:
 *  sidebarGroups  – Array<{ groupLabel: string, items: Array<{ key, label, icon }> }>
 *  userProfile    – { name, email, role, avatarUrl } (from fetchUserProfile())
 *  activeKey      – string key of the currently selected nav item
 *  onSelect       – (key: string) => void  — called when the user clicks a nav item
 *  pageTitle      – string shown in the top bar
 *  children       – the main content area rendered to the right of the sidebar
 */
export default function DashboardLayout({
  sidebarGroups = [],
  userProfile = {},
  activeKey,
  onSelect,
  pageTitle = "Dashboard",
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState(() => {
    // Start with all groups expanded
    const init = {};
    sidebarGroups.forEach((g) => { init[g.groupLabel] = true; });
    return init;
  });

  const toggleGroup = (label) => {
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden bg-(--bg)">
      {/* ── Mobile overlay ─────────────────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 md:z-auto
          h-full md:h-full
          w-72 md:w-64 lg:w-72
          bg-(--bg) border-r border-(--border)
          shadow-[4px_0_24px_-4px_rgba(99,102,241,0.12)]
          flex flex-col
          transition-transform duration-300 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Sidebar close btn (mobile) */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-(--border) md:hidden">
          <span className="font-semibold text-(--text-h) text-sm">Navigation</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-(--code-bg) text-(--text) cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sidebarGroups.map((group) => (
            <div key={group.groupLabel} className="mb-1">
              {/* Group header */}
              <button
                onClick={() => toggleGroup(group.groupLabel)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-(--text) hover:bg-(--code-bg) transition-colors duration-150 cursor-pointer"
              >
                <span>{group.groupLabel}</span>
                {expandedGroups[group.groupLabel]
                  ? <FaChevronDown className="text-[10px] opacity-60" />
                  : <FaChevronRight className="text-[10px] opacity-60" />}
              </button>

              {/* Group items */}
              {expandedGroups[group.groupLabel] && (
                <div className="mt-1 space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = activeKey === item.key;
                    return (
                      <button
                        key={item.key}
                        onClick={() => { onSelect(item.key); setSidebarOpen(false); }}
                        className={`
                          w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                          transition-all duration-150 text-left cursor-pointer
                          ${isActive
                            ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
                            : "text-(--text) hover:text-(--text-h) hover:bg-(--accent-bg)"
                          }
                        `}
                      >
                        <span className={`text-base ${isActive ? "text-white" : "text-indigo-400"}`}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User profile footer */}
        <div className="p-4 border-t border-(--border) bg-(--code-bg)">
          <Link to="/profile" className="flex items-center gap-3 group">
            {userProfile.avatarUrl ? (
              <img
                src={userProfile.avatarUrl}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover border-2 border-(--border) group-hover:border-indigo-400 transition-colors duration-200"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-200 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                {userProfile.name?.[0] ?? "U"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-(--text-h) truncate group-hover:text-indigo-600 transition-colors duration-200">
                {userProfile.name ?? "Loading…"}
              </p>
              <p className="text-[11px] text-(--text) truncate capitalize">{userProfile.role ?? ""}</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* ── Main area ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 flex items-center gap-3 px-4 md:px-6 py-3 border-b border-(--border) bg-(--bg) shadow-[0_2px_12px_-4px_rgba(99,102,241,0.08)]">
          {/* Hamburger – mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-(--code-bg) text-(--text) cursor-pointer"
          >
            <FaBars />
          </button>
          <h1 className="text-base md:text-lg font-semibold text-(--text-h)">{pageTitle}</h1>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
