import "../styles/App.css";
import Home from "./Home";
import React, { Component, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthAdmin from "./AuthAdmin";
import AuthUser from "./AuthUser";
import GestionComptes from "./GestionComptes";
import GestionMissions from "./GestionMissions";

function App() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="authAdmin" element={<AuthAdmin />} />
          <Route path="authUser" element={<AuthUser />} />
          <Route path="gestionComptes" element={<GestionComptes />} />
          <Route path="gestionMissions" element={<GestionMissions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
