import React, { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";
import Login from "./Login";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);
  const [toggle,setToggle] = useState("signin") 

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

  const signup=()=>{
    setToggle("login")
  }

  return (
<>
    {toggle===("signin")?<div className="login">
    <div className="container">
        <h1>Welcome to Food-ez<br />Register here:</h1>
    
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <input type="password" placeholder="Confirm Password" value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)} required/>
            <ErrorMessage message={errorMessage} />

          <button className="submit_2 ml-3" type="submit">Register</button>
          </form>
          <h2 className="ml-1 has-text-black">Already Registered?</h2>
          <button className="submit_2 sign mt-3" onClick={signup}>Login</button>
        </div>
    
      </div>
       </div>:(toggle===("login")?<Login/>:null)}
       </>
      
  );
};

export default Register;
