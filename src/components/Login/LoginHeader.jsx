import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <div className="container">
      <header className="header">
        <nav className="navbar">
          <Link to="/" className="nav__logo">
            LingoPlay
          </Link>
        </nav>
      </header>
    </div>
  );
};
