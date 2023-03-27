import React from "react";
import "../styles/AuthAdmin.css";
import FormAuth from "../components/FormAuth";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

const AuthAdmin = () => {
  if (localStorage.getItem("userConnected") !== null) {
    window.location.replace("/home");
  } else {
    return (
      <div>
        <Navbar />
        <FormAuth typeForm="0" />
        <NavLink to="/AuthUser">Vous êtes un utilisateur ?</NavLink>
      </div>
    );
  }
};

export default AuthAdmin;
