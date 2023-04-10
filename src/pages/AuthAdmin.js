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
        <h1>Page de connexion (administrateur)</h1>
        <FormAuth typeForm="0" />

        <div className="Auth-link">
          <NavLink to="/AuthUser">Vous êtes un utilisateur ?</NavLink>
        </div>
      </div>
    );
  }
};

export default AuthAdmin;
