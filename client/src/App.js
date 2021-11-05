import React, { useContext, useEffect, useState } from "react";

import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import Table from "./components/Table";
import { UserContext } from "./context/UserContext";
import {BrowserRouter, Route, Switch  } from "react-router-dom"
import "../src/style.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [token,setToken] = useContext(UserContext);
  const [toggle,setToggle]=useState("login");

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("something messed up");
    } else {
      setMessage(data.message);
    }
  };

 const login=()=>{
  <Login />
 }

 const toggle_btn=()=>{
   if(toggle==="login")
   setToggle(true)
   else if(toggle==="signup")
   setToggle(false)
 }

 

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    
      <>
      <div className="grid align__item">

      <div className="parent clearfix">
    <div className="bg-illustration">
      {/* <img src="https://i.ibb.co/Pcg0Pk1/logo.png" alt="logo"/> */}
      {/* <img id="logo" src="https://i.ibb.co/rx6RnHW/logo.png" alt="logo" border="10" height="15" width="10"/> */}
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

    </div>
    {toggle===("login")?<Login/>:(toggle===("signup")?<Register/>:null)}
  </div>
  </div>
  
  </>
  );
};

export default App;
