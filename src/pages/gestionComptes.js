import React, { useState, useEffect } from "react";
import "../styles/GestionComptes.css";
import Navbar from "../components/Navbar";
import CardUser from "../components/CardUser";
import axios from "axios";

const GestionComptes = () => {
  const [lesUtilisateurs, setLesUtilisateurs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/utilisateurs")
      .then((res) => setLesUtilisateurs(res.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="allUserCard-Grid">
        {lesUtilisateurs.map((unUtilisateur) => (
          <div key={unUtilisateur.idEmploye} className="UserCard-Only">
            <CardUser User={unUtilisateur} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionComptes;