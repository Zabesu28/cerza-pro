import React, { useState } from "react";
import "../styles/FiltreUser.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { width } from "@mui/system";

const FiltreUser = (props) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [identifiant, setIdentifiant] = useState("");

  const inputNom = (event) => {
    event.preventDefault();
    setNom(event.target.value);
  };

  const inputPrenom = (event) => {
    event.preventDefault();
    setPrenom(event.target.value);
  };

  const inputIdentifiant = (event) => {
    event.preventDefault();
    setIdentifiant(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filtre = {
      nomFiltre: nom.trim().toLowerCase(),
      prenomFiltre: prenom.trim().toLowerCase(),
      identifiantFiltre: identifiant.trim().toLowerCase(),
    };

    props.trierComptes(filtre);
  };

  const handleAnnulerFiltre = (event) => {
    event.preventDefault();
    props.annulerFiltre();
    setNom("");
    setPrenom("");
    setIdentifiant("");
  };

  return (
    <div>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="filtre-grid">
          <div className="filtre-grid-element">
            <TextField
              id="nom"
              label="Nom"
              variant="outlined"
              onChange={inputNom}
              value={nom}
            />
          </div>

          <div className="filtre-grid-element">
            <TextField
              id="prenom"
              label="Prénom"
              variant="outlined"
              onChange={inputPrenom}
              value={prenom}
            />
          </div>

          <div className="filtre-grid-element">
            <TextField
              id="prenom"
              label="Prénom"
              variant="outlined"
              onChange={inputPrenom}
              value={prenom}
            />
          </div>

          <div className="filtre-grid-element">
            <TextField
              id="identifiant"
              label="Identifiant"
              variant="outlined"
              onChange={inputIdentifiant}
              value={identifiant}
            />
          </div>

          <div className="filtre-grid-element">
            <Button
              className="btn-filtre"
              variant="contained"
              size="medium"
              type="submit"
            >
              Rechercher
            </Button>
          </div>

          <div className="filtre-grid-element">
            <Button
              className="btn-filtre"
              variant="contained"
              size="medium"
              onClick={handleAnnulerFiltre}
            >
              Annuler
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default FiltreUser;
