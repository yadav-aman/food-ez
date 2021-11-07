import React, { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";
import Login from "./Login";
import { useHistory } from "react-router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);
  const [toggle, setToggle] = useState("signin");
  const history = useHistory();

  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, username: email, password: password }),
    };

    const response = await fetch("http://localhost:8000/user/", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
      history.push("/dashboard");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword && password.length > 5) {
      submitRegistration();
    } else {
      setErrorMessage(
        "Ensure that the passwords match and greater than 5 characters"
      );
    }
  };

  const signup = () => {
    setToggle("login");
  };

  return (
    <>
      {toggle === "signin" ? (
        <div className="grid align__item">
          <div className="parent clearfix">
            <div className="bg-illustration">
              <img
                id="logo"
                src="https://i.ibb.co/FDd5THW/Logo-food-ez.png"
                alt="Logo-food-ez"
                border="0"
              />

              <div className="burger-btn">
                <span>
                  <img
                    id="restaurant-table"
                    // src="LandingAssets.png"  height="23" width="30"
                    src="https://i.ibb.co/JC29XSS/Landing-Assets.png"
                    alt="imageishere"
                  ></img>
                </span>
                <span>
                  <img
                    id="three_ladies"
                    src="https://i.ibb.co/gVQ5h3N/3.png"
                    alt="3"
                    border="0"
                  />
                </span>
                <span></span>
              </div>
            </div>
            <div className="login">
              <div className="container">
                <h1>
                  Welcome to Food-ez
                  <br />
                  Register here:
                </h1>

                <div className="login-form">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmationPassword}
                      onChange={(e) => setConfirmationPassword(e.target.value)}
                      required
                    />
                    <ErrorMessage message={errorMessage} />

                    <button className="submit_2 ml-3" type="submit">
                      Register
                    </button>
                  </form>
                  <h2 className="ml-1 has-text-black">Already Registered?</h2>
                  <button className="submit_2 sign mt-3" onClick={signup}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : toggle === "login" ? (
        <Login />
      ) : null}
    </>
  );
};

export default Register;
