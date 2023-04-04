import '../styles/App.css';
import Home from './Home';
import React, { Component, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Encyclopedie from './Encyclopedie';
import Description from './Description';
import QuestionnaireSante from './QuestionnaireSante';

function App() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path="home" element={<Home/>} />
          <Route path="encyclopedie" element={<Encyclopedie/>}></Route>
          <Route path="encyclopedie/:espece" element={<Description/>}></Route>
          <Route path="questionnaireSante" element={<QuestionnaireSante/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
