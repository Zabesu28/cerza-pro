import '../styles/App.css';
import Home from './Home';
import React, { Component, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar';
import ListAlerteUser from './ListAlerteUser';
import AddAlerteUser from './AddAlerteUser';
import ListMissionUser from './ListMissionUser';

function App() {
  const [showNav, setShowNav] = useState(false);

  

  return (
    <div>
      <Navbar/>   
      <BrowserRouter>
      <Routes>
          <Route path="home" element={<Home/>} />
          <Route path="listMissionUser/:id" element={<ListMissionUser/>} />
          <Route path="listAlerte" element={<ListAlerteUser/>} />
          <Route path="addAlerteUser" element={<AddAlerteUser/>} />
          
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
