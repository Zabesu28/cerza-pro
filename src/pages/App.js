import "../styles/App.css";
import Home from "./Home";
import React, { Component, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthAdmin from "./AuthAdmin";
import AuthUser from "./AuthUser";

function App() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="authAdmin" element={<AuthAdmin />} />
          <Route path="authUser" element={<AuthUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
