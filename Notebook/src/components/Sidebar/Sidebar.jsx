import { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { ThemeToggle } from "../../mode";
import { useCreateNote } from "../../save/TasksContext";


export function Sidebar() {
  const createAndOpen = useCreateNote
  const [isOpen, setIsOpen] = useState(false);
  const showbar = () => setIsOpen((open) => !open);

  return (
    <>
      <button
        className="hamburger"
        type="button"
        onClick={showbar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={isOpen ? "sidebar active" : "sidebar"}>
        <ul onClick={showbar}>
          <li><Link to="/">Home</Link></li>
          <li><button type= "button" onClick={createAndOpen}>new note</button></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>
        <ThemeToggle/>
      </nav>
    </>
  );
}
