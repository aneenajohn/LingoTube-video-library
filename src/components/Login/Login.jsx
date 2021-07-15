import { useReducer, useState } from "react";
import { Header } from "./LoginHeader";
import { loginReducer } from "./loginReducer";
import { useAuth } from "../Context/authProvider";
import { SET_USER_INFO, SET_LOGIN } from "../Utils/constants";
import { loginService } from "../ServerCalls/ServerCalls";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./Login.css";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

export function Login() {
  const userInfo = {
    email: "",
    password: ""
  };
  const [loginState, loginDispatch] = useReducer(loginReducer, userInfo);
  console.log(loginState);
  const { authDispatch } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  function signInHandler(e) {
    console.log(e.target.name);
    console.log(e.target.value);
    loginDispatch({
      type: SET_USER_INFO,
      payLoad: { field: e.target.name, value: e.target.value }
    });
  }

  async function loginHandler() {
    toast.info(`Please hold on..We are logging you in!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true
    });
    const { data } = await loginService(loginState.email, loginState.password);
    console.log(data);
    const { success, token } = data;
    if (success) {
      localStorage.setItem(
        "login",
        JSON.stringify({ isLoggedIn: true, userToken: token })
      );
      authDispatch({
        type: SET_LOGIN,
        payLoad: {
          token: data.token
        }
      });

      navigate(state?.from ? state.from : "/");
      toast.success(`LoggedIn succesfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
    } else {
      toast.dark(`Login Failed. Please check and try again`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
    }
  }

  return (
    <>
      <Header />
      <div className="inputForm">
        <div className="box">
          <div className="form">
            <input
              className="form__input email"
              type="text"
              name="email"
              value={loginState.email}
              onChange={signInHandler}
              required
            ></input>
            <label className="form__label">email</label>
          </div>
          <div className="form">
            <input
              className="form__input"
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginState.password}
              onChange={signInHandler}
              required
            ></input>
            <div>
              {loginState.password && (
                <div
                  className="setPasswordVisibility"
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? (
                    <VisibilityOffIcon className="showPassword" />
                  ) : (
                    <VisibilityIcon className="showPassword" />
                  )}
                </div>
              )}
            </div>
            <label className="form__label">password</label>
          </div>
          <div className="btn__container">
            <div className="btn btn--primary login" onClick={loginHandler}>
              Login
            </div>
          </div>
          <p className="para signup-header">
            New to LingoPlay?
            <span>
              <Link to="/signup" className="signup">
                SignUp
              </Link>
            </span>
          </p>
          <div className="test">
            <p>Test Credentials</p>
            <p>email: test123@gmail.com</p>
            <p>password: test123</p>
          </div>
        </div>
      </div>
      <ToastContainer style={{ fontSize: "medium" }} />
    </>
  );
}
