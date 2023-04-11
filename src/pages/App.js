import '../styles/App.css';
import React, { Component, useState } from 'react';
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
          <Route path="" element={<Encyclopedie/>}></Route>
          <Route path="/:espece" element={<Description/>}></Route>
          <Route path="questionnaireSante" element={<QuestionnaireSante/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
