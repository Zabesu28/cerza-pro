import React, { useState, useEffect } from "react";
import "../styles/FiltreUser.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";

const FiltreUser = (props) => {
  const [lesFonctions, setLesFonctions] = useState([]);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const [fonction, setFonction] = useState("Default");

  useEffect(() => {
    axios
      .get("http://localhost:4000/fonctions")
      .then((res) => setLesFonctions(res.data));
  }, []);

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
      fonctionFiltre: fonction,
    };

    props.trierComptes(filtre);
  };

  const handleAnnulerFiltre = (event) => {
    event.preventDefault();
    props.annulerFiltre();
    setNom("");
    setPrenom("");
    setIdentifiant("");
    setFonction("Default");
  };

  const inputFonction = (event) => {
    event.preventDefault();
    setFonction(event.target.value);
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

          <div>
            <TextField
              id="standard-basic-select"
              select
              defaultValue={fonction}
              value={fonction}
              variant="outlined"
              onChange={inputFonction}
            >
              <MenuItem value="Default">Choisir une fonction</MenuItem>
              {lesFonctions.map((uneFonction) => (
                <MenuItem
                  key={uneFonction.idFonction}
                  value={uneFonction.libelleFonction}
                >
                  {uneFonction.libelleFonction}
                </MenuItem>
              ))}
            </TextField>
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
