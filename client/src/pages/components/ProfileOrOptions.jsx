/* Created By - Sudarshan Gondalwad

 This is component which includes options related to sign in and signUP option and 
 if user is already signed up it provides profile options with onclick sibebar */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaThLarge, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { isValidToken, signOut } from "../../jsFunctions";
import Button from "../ui/Button";
// import Button from "./Button";


export default function ProfileOrOptions() {
  const [isLoggedIn, setIsLoggedIn] = useState(isValidToken());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(isValidToken());
    };

    // check on first load
    checkLogin();

    // listen for storage changes
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleSignOut = () => {
    signOut();
  };

  // Easily add, modify, or reorder items in this array to customize the sidebar list
  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      type: "link",
      icon: <FaThLarge className="text-lg text-indigo-500" />,
    },
    {
      label: "Profile",
      path: "/profile",
      type: "link",
      icon: <FaUser className="text-lg text-indigo-500" />,
    },
    {
      label: "Sign Out",
      type: "button",
      action: handleSignOut,
      icon: <FaSignOutAlt className="text-lg text-red-500" />,
      className: "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 dark:hover:text-red-300",
    },
  ];

  return (
    <>
      {isLoggedIn ? (
        <div className="relative">
          {/* Rounded Avatar Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center justify-center rounded-full border-2 border-transparent hover:border-indigo-500 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 active:scale-95 cursor-pointer shadow-md hover:shadow-indigo-500/20"
            aria-label="User profile options"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
              alt="Profile Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </button>

          {/* Right Sliding Sidebar */}
          {/* Backdrop Overlay */}
          <div
            className={`fixed inset-0 bg-slate-950/30 backdrop-blur-xs transition-opacity duration-300 z-999 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar Panel */}
          <div
            className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-(--bg) border-l border-(--border) shadow-[-10px_0_30px_-5px_rgba(99,102,241,0.2)] dark:shadow-[-10px_0_30px_-5px_rgba(99,102,241,0.35)] transition-transform duration-300 ease-out z-1000 flex flex-col ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-(--border) flex items-center justify-between bg-(--bg)">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                  alt="Profile Avatar"
                  className="w-10 h-10 rounded-full object-cover border border-(--border)"
                />
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-(--text-h) leading-tight">Jane Doe</h3>
                  <span className="text-xs text-(--text) truncate max-w-35">jane.doe@codecluster.com</span>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-xl hover:bg-(--code-bg) text-(--text) hover:text-(--text-h) transition-colors duration-200 cursor-pointer"
                aria-label="Close sidebar"
              >
                <FaTimes className="text-base" />
              </button>
            </div>

            {/* Sidebar List Options */}
            <div className="flex-1 py-6 overflow-y-auto px-4 space-y-2 bg-(--bg)">
              {menuItems.map((item, idx) => {
                const isButton = item.type === "button";
                const baseClass = `flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 text-left cursor-pointer ${item.className || "text-[var(--text)] hover:text-[var(--text-h)] hover:bg-[var(--accent-bg)] hover:shadow-xs hover:shadow-indigo-500/5"
                  }`;

                if (isButton) {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        item.action();
                        setIsSidebarOpen(false);
                      }}
                      className={baseClass}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={baseClass}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-(--border) text-center text-xs text-(--text) bg-(--code-bg)">
              CodeCluster v1.0.0
            </div>
          </div>
        </div>
      ) : (
        <ul className="flex gap-3 h-fit">
          <li>
            <Link to="/signin">
              <Button value={"Sign In"} />
            </Link>
          </li>

          <li>
            <Link to="/signup">
              <Button value={"Sign Up"} className={"bg-transparent"} />
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
