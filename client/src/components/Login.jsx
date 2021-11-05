import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import Register from "./Register";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);
  const [toggle,setToggle]=useState("login");

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };

    const response = await fetch(
      "http://localhost:8000/auth/login",
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  const signup=()=>{
    setToggle("sign")
  }

  return (
    
    <>
    {toggle===("login")?<div className="login">
      <div className="container">
        <h1>Login to access to<br />your account</h1>
    
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="E-mail Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <ErrorMessage message={errorMessage} />

            <div className="forget-pass">
              <h3 onClick={signup} className="has-text-black">Forgot Password ?</h3>
            </div>

            <div className="is-flex p-2 together">
            <button type="submit">LOG-IN</button>
            
            </div>
          </form>
          <h2 className="ml-1 has-text-black">Never Registered?</h2>
          <button className="submit_2 sign mt-3" onClick={signup}>Signup</button>
        </div>
    
      </div>
      </div>:(toggle===("sign")?<Register/>:null)}
    
</>
  );
};

export default Login;

