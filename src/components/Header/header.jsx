import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./header.css";
export const Header = () => {
  const [isSelected, setSelected] = useState(false);
  const toggleActive = () => setSelected(!isSelected);
  return (
    <div className="container">
      <header className="header">
        <nav className="navbar">
          <Link to="/" className="nav__logo">
            LingoPlay
          </Link>
          <ul className={isSelected ? "nav__menu active" : "nav__menu"}>
            <li className="nav__item mobile__menu">
              <Link to="/" className="nav__link" onClick={() => toggleActive()}>
                Home
              </Link>
            </li>
            <li className="nav__item mobile__menu">
              <Link
                to="/playlist"
                className="nav__link"
                onClick={() => toggleActive()}
              >
                Playlist
              </Link>
            </li>
            <li className="nav__item mobile__menu">
              <Link
                to="/liked"
                class="nav__link"
                onClick={() => toggleActive()}
              >
                Liked Videos
              </Link>
            </li>
            <li class="nav__item mobile__menu">
              <Link
                to="/history"
                class="nav__link"
                onClick={() => toggleActive()}
              >
                History
              </Link>
            </li>
          </ul>
          <div
            className={isSelected ? "hamburger active" : "hamburger"}
            onClick={() => toggleActive()}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>
      <nav class="navigation">
        <div class="nav__components">
          <Link to="/" id="nav__components" className="nav__link">
            Home
          </Link>
          <Link to="/playlist" id="nav__components" className="nav__link">
            Playlist
          </Link>
          <Link to="/liked" id="nav__components" className="nav__link">
            Liked Videos
          </Link>
          <Link to="/history" id="nav__components" className="nav__link">
            History
          </Link>
        </div>
      </nav>
    </div>
  );
};
