import "../styles/App.css";
import Home from "./Home";
import React, { Component, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthAdmin from "./AuthAdmin";
import AuthUser from "./AuthUser";
import GestionComptes from "./GestionComptes";
import GestionMissions from "./GestionMissions";
import Navbar from '../components/Navbar';
import ListAlerte from './ListAlerte';
import AddAlerte from './AddAlerte';
import ModifAlerte from './ModifAlerte';
import ListAlerteUser from './ListAlerteUser';
import AddAlerteUser from './AddAlerteUser';
import ListMissionUser from './ListMissionUser';

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
          <Route path="listMissionUser/:id" element={<ListMissionUser/>} />
          <Route path="listAlerte" element={<ListAlerteUser/>} />
          <Route path="addAlerteUser" element={<AddAlerteUser/>} />
          <Route path="gestionAlerte" element={<ListAlerte/>} />
          <Route path="addAlerte" element={<AddAlerte/>} />
          <Route path="modifAlerte/:id" element={<ModifAlerte/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
