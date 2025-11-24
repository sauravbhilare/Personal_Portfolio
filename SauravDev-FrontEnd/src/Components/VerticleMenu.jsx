import React from "react";
import "../style/VerticleMenu.css";

const VerticleMenu = ({ activeMenu, onMenuChange }) => {
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

  return (
    <div className="verticle-menu">
      <div className="menu-header">
        <h3>Navigation</h3>
      </div>

      <div className="menu-items">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${activeMenu === item.id ? "active" : ""}`}
            onClick={() => onMenuChange(item.id)}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
            {activeMenu === item.id && <div className="active-indicator"></div>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VerticleMenu;
