import React, { useState, useRef, useEffect } from "react";
import "../style/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".menu-toggle")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Function to check if link is active
  const isActive = (path) => {
    return window.location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">SAURAV.DEV</div>

      {/* Mobile nav icons with user login - Now placed before menu toggle */}
      <div className="nav-icon-mobile">
        <a
          href="https://github.com/sauravbhilare"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/saurav-bhilare-98b394269/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>

        {/* Mobile User Login - Now visible */}
        <div className="user-login-mobile">
          <a href="/login" aria-label="Login">
            <i className="fas fa-user"></i>
          </a>
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        type="button"
      >
        <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </button>

      {/* Navigation Links */}
      <div className={`nav-menu ${isMenuOpen ? "active" : ""}`} ref={menuRef}>
        <ul className="nav-links">
          <li>
            <a href="/" className={isActive("/")} onClick={closeMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="/about" className={isActive("/about")} onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a
              href="/resume"
              className={isActive("/resume")}
              onClick={closeMenu}
            >
              Resume
            </a>
          </li>
          <li>
            <a
              href="/portfolio"
              className={isActive("/portfolio")}
              onClick={closeMenu}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className={isActive("/contact")}
              onClick={closeMenu}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Desktop nav-icons with user login */}
      <div className="nav-icon">
        <a
          href="https://github.com/sauravbhilare"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/saurav-bhilare-98b394269/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>

        {/* User Login Section */}
        <div className="user-login">
          <a href="/login">
            <i className="fas fa-user"></i>
            <span>Login</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
