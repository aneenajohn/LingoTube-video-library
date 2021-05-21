import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./header.css";
import { useData } from "../DataContext/DataContext";
export const Header = () => {
  const [isSelected, setSelected] = useState(false);
  const { history } = useData();
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
              <div className="aside-container">
                <i className="fa fa-2x fa-home" aria-hidden="true"></i>
                <Link
                  to="/"
                  className="nav__link menu-items"
                  onClick={() => toggleActive()}
                >
                  Home
                </Link>
              </div>
            </li>
            <li className="nav__item mobile__menu">
              <div className="aside-container">
                <i class="fa fa-2x fa-youtube-play" aria-hidden="true"></i>
                <Link
                  to="/playlist"
                  className="nav__link menu-items"
                  onClick={() => toggleActive()}
                >
                  Playlist
                </Link>
              </div>
            </li>
            <li className="nav__item mobile__menu">
              <div className="aside-container">
                <i class="fa fa-2x fa-thumbs-up" aria-hidden="true"></i>
                <Link
                  to="/liked"
                  class="nav__link menu-items"
                  onClick={() => toggleActive()}
                >
                  Liked
                </Link>
              </div>
            </li>
            <li class="nav__item mobile__menu">
              <div className="aside-container">
                <i class="fa fa-2x fa-history" aria-hidden="true"></i>
                <Link
                  to="/history"
                  state={{ history }}
                  class="nav__link menu-items"
                  onClick={() => toggleActive()}
                >
                  History
                </Link>
              </div>
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
          <div className="aside-container">
            <i className="fa fa-home aside-icons" aria-hidden="true"></i>
            <Link to="/" id="nav__components" className="nav__link">
              Home
            </Link>
          </div>
          <div className="aside-container">
            <i
              class="fa fa-x fa-youtube-play aside-icons"
              aria-hidden="true"
            ></i>
            <Link to="/playlist" id="nav__components" className="nav__link">
              Playlist
            </Link>
          </div>
          <div className="aside-container">
            <i class="fa fa-x fa-thumbs-up aside-icons" aria-hidden="true"></i>
            <Link to="/liked" id="nav__components" className="nav__link">
              Liked
            </Link>
          </div>
          <div className="aside-container">
            <i class="fa fa-history aside-icons" aria-hidden="true"></i>
            <Link
              to="/history"
              state={{ history }}
              id="nav__components"
              className="nav__link"
            >
              History
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
