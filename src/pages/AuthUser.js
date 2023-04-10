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
        <h1>Page de connexion (utilisateur)</h1>
        <FormAuth typeForm="1" />

        <div className="Auth-link">
          <NavLink to="/AuthAdmin">Vous êtes administrateur ?</NavLink>
        </div>
      </div>
    );
  }
};

export default AuthUser;
