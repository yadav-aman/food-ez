import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import Register from "./Register";
import Welcome from "./Welcome";
import Fetch from "./Fetch";


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
      window.location.href='/welcome_user';
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
    {toggle===("login")? <div className="grid align__item">

<div className="parent clearfix">
<div className="bg-illustration">
<img id="logo" src="https://i.ibb.co/FDd5THW/Logo-food-ez.png" alt="Logo-food-ez" border="0"/>

<div className="burger-btn">
  <span><img id="restaurant-table"
    // src="LandingAssets.png"  height="23" width="30"
    src ="https://i.ibb.co/JC29XSS/Landing-Assets.png"
    alt="imageishere"  ></img>
 </span>
  <span>
  <img id="three_ladies" src="https://i.ibb.co/gVQ5h3N/3.png" alt="3" border="0"/>
  </span>
  <span></span>
</div>

</div><div className="login">
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
      </div>
      </div>
      </div>:(toggle===("sign")?<Register/>:null)}
    
</>
  );
};

export default Login;

