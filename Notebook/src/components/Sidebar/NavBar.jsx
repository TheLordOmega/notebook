import React from "react";

export const Navbar = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

  return (
    <nav className="navbar">
      <ul>
        <li className="nav-item">
          <a href="#">Dashboard</a>
        </li>
        <li className="nav-item">
          <a href="#">Widgets</a>
        </li>
        <li className="nav-item">
          <button
            aria-expanded={isSubMenuOpen ? "true" : "false"}
            onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
          >
            Apps
          </button>

          <ul className={`sub-menu ${isSubMenuOpen ? "sub-menu--open" : ""}`}>
            <li>
              <a href="#">Calendar</a>
            </li>
            <li>
              <a href="#">Chat</a>
            </li>
            <li>
              <a href="#">Email</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
