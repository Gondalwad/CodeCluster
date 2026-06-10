import { BrowserRouter, Link } from "react-router";
import Button from "../ui/Button";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <BrowserRouter>
        <nav className="flex justify-between p-2 shadow-2xl shadow-indigo-400  items-center rounded-lg">
          {/* nav icon in responsive screen like phone/tab */}
          
          {isNavOpen ? (
            <FaTimes
            className="text-3xl md:hidden cursor-pointer transition-transform duration-300 rotate-90"
            onClick={toggleNav}
            />
          ) : (
            <FaBars
            className="text-3xl md:hidden cursor-pointer transition-transform duration-300"
            onClick={toggleNav}
            />
          )}
          {/* first ul set containing home,about... */}
          <ul
            className={`
                absolute
                top-16
                left-0
                
                bg-indigo-950
                flex-col
                w-full
                p-4
                flex gap-5
                transition-all duration-300 ease-in-out
                shadow-indigo-400
                shadow-2xl
                rounded-xl

                ${
                isNavOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4 pointer-events-none"
                }
                md:static
                md:opacity-100
                md:translate-y-0
                md:pointer-events-auto
                md:flex
                md:flex-row
                md:bg-transparent
                md:w-fit
                md:py-2
                md:shadow-none
                
            `}>
            <li className="hover:text-gray-200">
              <Link to="/">
                <img src="../../public/codecluster-logo.png" className="w-8 shadow-xs" alt="png" />
              </Link>
            </li>
            <li className="hover:text-gray-200 text-lg h-fit">
              <Link to="/home">Home</Link>
            </li>
            <li className="hover:text-gray-200 text-lg h-fit">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:text-gray-200 text-lg h-fit">
              <Link to="/services">Services</Link>
            </li>
            <li className="hover:text-gray-200 text-lg h-fit">
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>

            {/* Second ul containing only buttons */}
          <ul className="flex gap-3 h-fit">
            <li>
              <Link to="/signIn">
                <Button value={"Sign In"} />
              </Link>
            </li>
            <li>
              <Link to="/signUp">
                <Button value={"Sign Up"} className={"bg-transparent"} />
              </Link>
            </li>
          </ul>
        </nav>
      </BrowserRouter>
    </>
  );
}
