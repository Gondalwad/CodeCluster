import { Link } from "react-router-dom";
import { Button } from "../ui";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-4 border-b border-[var(--border)] bg-[var(--bg)] shadow-lg">
      {/* Mobile Nav Toggle */}
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="text-2xl md:hidden text-[var(--text-h)] transition-transform duration-300"
      >
        {isNavOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <ul className={`
        absolute top-16 left-0 w-full p-4 flex flex-col gap-5
        bg-[var(--bg)] border-b border-[var(--border)] shadow-lg
        transition-all duration-300 ease-in-out
        ${
          isNavOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }
        md:static md:opacity-100 md:translate-y-0 md:pointer-events-auto
        md:flex md:flex-row md:w-fit md:p-0 md:shadow-none md:border-0
      `}>
        <li>
          <Link to="/">
            <img src="/codecluster-logo.png" className="w-8" alt="CodeCluster Logo" />
          </Link>
        </li>
        <li className="hover:text-[var(--accent)] text-[var(--text-h)] text-lg transition-colors">
          <Link to="/home">Home</Link>
        </li>
        <li className="hover:text-[var(--accent)] text-[var(--text-h)] text-lg transition-colors">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:text-[var(--accent)] text-[var(--text-h)] text-lg transition-colors">
          <Link to="/problems">Problems</Link>
        </li>
        <li className="hover:text-[var(--accent)] text-[var(--text-h)] text-lg transition-colors">
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>

      {/* Auth Buttons */}
      <ul className="flex gap-3">
        <li>
          <Link to="/signIn">
            <Button value="Sign In" />
          </Link>
        </li>
        <li>
          <Link to="/signUp">
            <Button value="Sign Up" className="bg-transparent text-[var(--accent)] border-[var(--accent)]" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
