import React from "react";
import FormAuth from "../components/FormAuth";

const AuthAdmin = () => {
  if (localStorage.getItem("userConnected") !== null) {
    window.location.replace("/home");
  } else {
    return (
      <div>
        <FormAuth typeForm="0" />
      </div>
    );
  }
};

export default AuthAdmin;
