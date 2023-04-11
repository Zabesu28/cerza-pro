import "../styles/App.css";
import React, { Component, useState } from "react";
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
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Encyclopedie from './Encyclopedie';
import Description from './Description';
import QuestionnaireSante from './QuestionnaireSante';

function App() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Encyclopedie />} />
          <Route path="authAdmin" element={<AuthAdmin />} />
          <Route path="authUser" element={<AuthUser />} />
          <Route path="gestionComptes" element={<GestionComptes />} />
          <Route path="gestionMissions" element={<GestionMissions />} />
          <Route path="listMissionUser" element={<ListMissionUser/>} />
          <Route path="listAlerte" element={<ListAlerteUser/>} />
          <Route path="addAlerteUser" element={<AddAlerteUser/>} />
          <Route path="gestionAlerte" element={<ListAlerte/>} />
          <Route path="addAlerte" element={<AddAlerte/>} />
          <Route path="modifAlerte/:id" element={<ModifAlerte/>} />
          <Route path="" element={<Encyclopedie/>}></Route>
          <Route path="/:espece" element={<Description/>}></Route>
          <Route path="questionnaireSante" element={<QuestionnaireSante/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
