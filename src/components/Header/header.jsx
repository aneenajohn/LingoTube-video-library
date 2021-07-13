import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./header.css";
import { useData } from "../DataContext/DataContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useAuth } from "../Context/authProvider";
// import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { SET_LOGOUT } from "../Utils/constants";

export const Header = () => {
  const [isSelected, setSelected] = useState(false);
  const [isAvatarClicked, setAvatarClicked] = useState(false);

  const { history } = useData();
  const {
    authState: { isLoggedIn },
    authDispatch
  } = useAuth();
  console.log({ isLoggedIn });
  const toggleActive = () => setSelected(!isSelected);
  const onAvatarClicked = () =>
    setAvatarClicked((isAvatarClicked) => !isAvatarClicked);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage?.removeItem("login");
    authDispatch({
      type: SET_LOGOUT
    });
  };

  return (
    <div className="container">
      <header className="header">
        <nav className="navbar">
          <Link to="/" className="nav__logo">
            LingoPlay
          </Link>
          {/* <Avatar className="avat
        ar"></Avatar> */}
          <div className="avatar" onClick={() => onAvatarClicked()}>
            <AccountCircleIcon className="avatarIcon" />
            {/* {isLoggedIn ? (
              <AccountCircleIcon className="avatarIcon" />
            ) : (
              <Avatar className="avatarIcon"></Avatar>
            )} */}
          </div>
          <ul className={isSelected ? "nav__menu active" : "nav__menu"}>
            <li className="nav__item mobile__menu hide">
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
      <div
        className={isAvatarClicked ? "show" : "hide"}
        onClick={() => onAvatarClicked()}
      >
        <div className="profile-data">
          {isLoggedIn ? (
            <p className="para" onClick={() => logoutHandler()}>
              Logout <ExitToAppIcon />
            </p>
          ) : (
            <p className="para" onClick={() => navigate("/login")}>
              Login
            </p>
          )}
          {/* <p className="para" onClick={() => logoutHandler()}>
            Logout <ExitToAppIcon />
          </p> */}
        </div>
      </div>
      <nav class="navigation">
        <div class="nav__components">
          <div className="aside-container">
            <Link to="/" id="nav__components" className="nav__link">
              <i className="fa fa-home aside-icons" aria-hidden="true"></i> Home
            </Link>
          </div>
          <div className="aside-container">
            <Link to="/playlist" id="nav__components" className="nav__link">
              <i
                className="fa fa-x fa-youtube-play aside-icons"
                aria-hidden="true"
              ></i>{" "}
              Playlist
            </Link>
          </div>
          <div className="aside-container">
            <Link to="/liked" id="nav__components" className="nav__link">
              <i
                class="fa fa-x fa-thumbs-up aside-icons"
                aria-hidden="true"
              ></i>{" "}
              Liked
            </Link>
          </div>
          <div className="aside-container">
            <Link
              to="/history"
              state={{ history }}
              id="nav__components"
              className="nav__link"
            >
              <i class="fa fa-history aside-icons" aria-hidden="true"></i>{" "}
              History
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
