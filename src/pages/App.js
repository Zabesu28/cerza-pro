import '../styles/App.css';
import Home from './Home';
import React, { Component, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar';
import Encyclopedie from './Encyclopedie';
import Description from './Description';

function App() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div>
      <Navbar/> 
      <BrowserRouter>
      <Routes>
          <Route path="home" element={<Home/>} />
          <Route path="encyclopedie" element={<Encyclopedie/>}></Route>
          <Route path="encyclopedie/:espece" element={<Description/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
