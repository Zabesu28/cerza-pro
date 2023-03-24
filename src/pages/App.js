import '../styles/App.css';
import Home from './Home';
import React, { Component, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar';
import ListAlerte from './ListAlerte';
import AddAlerte from './AddAlerte';
import ModifAlerte from './ModifAlerte';

function App() {
  const [showNav, setShowNav] = useState(false);

  

  return (
    <div>
      <Navbar/>   
      <BrowserRouter>
      <Routes>
          <Route path="home" element={<Home/>} />
          <Route path="gestionAlerte" element={<ListAlerte/>} />
          <Route path="addAlerte" element={<AddAlerte/>} />
          <Route path="modifAlerte/:id" element={<ModifAlerte/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
