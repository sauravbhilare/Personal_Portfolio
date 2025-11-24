import React, { useState, useEffect } from "react";
import "../style/VerticleMenu.css";

const VerticleMenu = ({ activeMenu, onMenuChange }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      id: "create-project",
      label: "Create Project",
      icon: "fas fa-plus-circle",
    },
    {
      id: "view-projects",
      label: "View Projects",
      icon: "fas fa-list",
    },
  ];

  // Close mobile menu when menu item is clicked
  const handleMenuClick = (menuId) => {
    onMenuChange(menuId);
    if (window.innerWidth <= 768) {
      setIsMobileOpen(false);
    }
  };

  // Close menu when clicking on overlay
  const handleOverlayClick = () => {
    setIsMobileOpen(false);
  };

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="menu-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        <i className={isMobileOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </button>

      {/* Mobile Overlay */}
      <div
        className={`menu-overlay ${isMobileOpen ? "mobile-open" : ""}`}
        onClick={handleOverlayClick}
      />

      {/* Vertical Menu */}
      <div className={`verticle-menu ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="menu-header">
          <h3>Navigation</h3>
        </div>

        <div className="menu-items">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${activeMenu === item.id ? "active" : ""}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
              {activeMenu === item.id && (
                <div className="active-indicator"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default VerticleMenu;
