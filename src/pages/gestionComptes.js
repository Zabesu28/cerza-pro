import React, { useState, useEffect } from "react";
import "../styles/GestionComptes.css";
import Navbar from "../components/Navbar";
import CardUser from "../components/CardUser";
import CardAjoutUser from "../components/CardAjoutUser";
import FiltreUser from "../components/FiltreUser";
import axios from "axios";

const GestionComptes = () => {
  const [lesUtilisateurs, setLesUtilisateurs] = useState([]);
  const [lesComptesNonFiltrer, setLesComptesNonFiltrer] = useState([]);
  const [IdModif, setIdModif] = useState("");
  const [IdSuppr, setIdSuppr] = useState("");
  const [IsAjout, setIsAjout] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/utilisateurs").then((res) => {
      setLesUtilisateurs(res.data);
      setLesComptesNonFiltrer(res.data);
    });
  }, []);

  const modifCompte = (Compte, id) => {
    const copieDesComptes = [...lesUtilisateurs];
    const updateLesComptes = [];

    for (let unCompte of copieDesComptes) {
      if (unCompte.idEmploye !== id) {
        updateLesComptes.push(unCompte);
      } else {
        updateLesComptes.push({
          idEmploye: id,
          nomEmploye: Compte.nom,
          prenomEmploye: Compte.prenom,
          login: Compte.identifiant,
          libelleFonction: Compte.fonction,
        });
      }
    }

    setLesUtilisateurs(updateLesComptes);
  };

  const supprCompte = (id) => {
    const copieDesComptes = [...lesUtilisateurs];

    const updateLesComptes = copieDesComptes.filter(
      (unCompte) => unCompte.idEmploye !== id
    );

    setLesUtilisateurs(updateLesComptes);
  };

  const ajoutCompte = (Compte, id) => {
    const copieDesComptes = [...lesUtilisateurs];

    let nvCompte = {
      idEmploye: id,
      nomEmploye: Compte.nom,
      prenomEmploye: Compte.prenom,
      login: Compte.identifiant,
      libelleFonction: Compte.fonction,
    };

    copieDesComptes.push(nvCompte);

    setLesUtilisateurs(copieDesComptes);
  };

  const trierComptes = (filtre) => {
    let trieDesComptes = [...lesComptesNonFiltrer];

    if (filtre.nomFiltre !== "") {
      trieDesComptes = trieDesComptes.filter((unCompte) =>
        unCompte.nomEmploye.toLowerCase().includes(filtre.nomFiltre)
      );
    }

    if (filtre.prenomFiltre !== "") {
      trieDesComptes = trieDesComptes.filter((unCompte) =>
        unCompte.prenomEmploye.toLowerCase().includes(filtre.prenomFiltre)
      );
    }

    if (filtre.identifiantFiltre !== "") {
      trieDesComptes = trieDesComptes.filter((unCompte) =>
        unCompte.login.toLowerCase().includes(filtre.identifiantFiltre)
      );
    }

    setLesUtilisateurs(trieDesComptes);
  };

  const annulerFiltre = () => {
    setLesUtilisateurs(lesComptesNonFiltrer);
  };

  if (
    localStorage.getItem("userConnected") !== null &&
    JSON.parse(localStorage.getItem("userConnected")).droitCnx ===
      "Administrateur"
  ) {
    return (
      <div>
        <Navbar />
        <FiltreUser trierComptes={trierComptes} annulerFiltre={annulerFiltre} />
        <div className="allUserCard-Grid">
          {lesUtilisateurs.map((unUtilisateur) => (
            <div key={unUtilisateur.idEmploye} className="UserCard-Only">
              <CardUser
                User={unUtilisateur}
                isModif={IdModif}
                setIdModif={setIdModif}
                isSuppr={IdSuppr}
                setIdSuppr={setIdSuppr}
                Modif={modifCompte}
                Suppr={supprCompte}
                isAjout={IsAjout}
                setIsAjout={setIsAjout}
              />
            </div>
          ))}
          <div className="UserCard-Only">
            <CardAjoutUser
              Ajout={ajoutCompte}
              isAjout={IsAjout}
              setIsAjout={setIsAjout}
            />
          </div>
        </div>
      </div>
    );
  } else {
    if (
      localStorage.getItem("userConnected") !== null &&
      JSON.parse(localStorage.getItem("userConnected")).droitCnx !==
        "Administrateur"
    ) {
      window.location.replace("/home");
    } else {
      window.location.replace("/authAdmin");
    }
  }
};

export default GestionComptes;
