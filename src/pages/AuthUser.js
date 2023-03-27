import React from "react";
import "../styles/AuthUser.css";
import FormAuth from "../components/FormAuth";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

const AuthUser = () => {
  if (localStorage.getItem("userConnected") !== null) {
    window.location.replace("/home");
  } else {
    return (
      <div>
        <Navbar />
        <FormAuth typeForm="1" />
        <NavLink to="/AuthAdmin">Vous êtes administrateur ?</NavLink>
      </div>
    );
  }
};

export default AuthUser;
