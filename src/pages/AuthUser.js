import React from "react";
import FormAuth from "../components/FormAuth";

const AuthUser = () => {
  if (localStorage.getItem("userConnected") !== null) {
    window.location.replace("/home");
  } else {
    return (
      <div>
        <FormAuth typeForm="1" />
      </div>
    );
  }
};

export default AuthUser;
