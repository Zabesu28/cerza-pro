import React, { useState, useEffect } from "react";
import "../styles/CardAjoutMission.css";
import { Link } from "@mui/joy";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const CardAjoutMission = (props) => {
  const [ajoutForm, setAjoutForm] = useState(false);
  const [lesUtilisateurs, setLesUtilisateurs] = useState([]);
  const [lesEnclos, setLesEnclos] = useState([]);

  const [titreMissionInput, setTitreMissionInput] = useState("");
  const [utilisateurMissionInput, setUtilisateurMissionInput] = useState("");
  const [enclosMissionInput, setEnclosMissionInput] = useState("");

  const [utilisateurMissionInputError, setUtilisateurMissionInputError] =
    useState(false);
  const [enclosMissionInputError, setEnclosMissionInputError] = useState(false);
  const [titreMissionInputError, setTitreMissionInputError] = useState(false);

  let regTitreMission = new RegExp(/^[a-zA-Z0-9 ]{4,}$/);

  useEffect(() => {
    axios
      .get("http://localhost:4000/utilisateurs")
      .then((res) => setLesUtilisateurs(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/enclos")
      .then((res) => setLesEnclos(res.data));
  }, []);

  const handleAjoutBtn = (event) => {
    event.preventDefault();

    setAjoutForm(true);
    props.setIsAjoutMission(true);
  };

  if (!props.IsAjoutMission && ajoutForm) {
    setAjoutForm(false);
  }

  const handleAnnulerBtn = (event) => {
    event.preventDefault();

    setAjoutForm(false);
    setTitreMissionInput("");
    setEnclosMissionInput("");
    setUtilisateurMissionInput("");
    setTitreMissionInputError(false);
    setEnclosMissionInputError(false);
    setUtilisateurMissionInputError(false);
  };

  const titreInput = (event) => {
    event.preventDefault();

    setTitreMissionInput(event.target.value.trim());

    if (titreMissionInputError) {
      setTitreMissionInputError(false);
    }
  };

  const utilisateurInput = (event) => {
    event.preventDefault();

    setUtilisateurMissionInput(event.target.value);

    if (utilisateurMissionInputError || enclosMissionInputError) {
      setEnclosMissionInputError(false);
      setUtilisateurMissionInputError(false);
    }
  };

  const enclosInput = (event) => {
    event.preventDefault();

    setEnclosMissionInput(event.target.value);

    if (enclosMissionInputError || utilisateurMissionInputError) {
      setEnclosMissionInputError(false);
      setUtilisateurMissionInputError(false);
    }
  };

  const handleSubmitAjout = async (event) => {
    event.preventDefault();

    if (titreMissionInput === "" || !regTitreMission.test(titreMissionInput)) {
      setTitreMissionInputError(true);
    }

    if (
      enclosMissionInput !== "" &&
      enclosMissionInput !== "Default" &&
      (utilisateurMissionInput === "" || utilisateurMissionInput === "Default")
    ) {
      setUtilisateurMissionInputError(true);
    }

    if (
      utilisateurMissionInput !== "" &&
      utilisateurMissionInput !== "Default" &&
      (enclosMissionInput === "" || enclosMissionInput === "Default")
    ) {
      setEnclosMissionInputError(true);
    }

    if (titreMissionInput !== "" && regTitreMission.test(titreMissionInput)) {
      if (
        ((utilisateurMissionInput === "" ||
          utilisateurMissionInput === "Default") &&
          (enclosMissionInput === "" || enclosMissionInput === "Default")) ||
        (utilisateurMissionInput !== "" &&
          utilisateurMissionInput !== "Default" &&
          enclosMissionInput !== "" &&
          enclosMissionInput !== "Default")
      ) {
        let idMissionAjoute = 0;

        await axios.post("http://localhost:4000/ajoutMission", {
          libMission: titreMissionInput,
        });

        await axios
          .get("http://localhost:4000/LastMissionIdAdd")
          .then((res) => {
            idMissionAjoute = res.data[0].idLastMission;
          });

        if (
          utilisateurMissionInput !== "" &&
          utilisateurMissionInput !== "Default" &&
          enclosMissionInput !== "" &&
          enclosMissionInput !== "Default"
        ) {
          await axios.post("http://localhost:4000/ajoutMission/attribuer", {
            idEmploye: utilisateurMissionInput,
            idMission: idMissionAjoute,
            codeEnclos: enclosMissionInput,
          });
        }

        props.ajoutMission(idMissionAjoute, titreMissionInput);
        setAjoutForm(false);
      }
    } else {
      alert(
        "Erreur lors de l'ajout de cette mission, veuillez vérifier que vous avez saisi toutes les données nécessaires et qu'elles sont correctes !"
      );
    }
  };

  return (
    <div>
      {ajoutForm ? (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmitAjout}
        >
          <div className="MissionCard-modifForm">
            <div className="MissionCard-element-large">
              <TextField
                id="standard-basic"
                className="MissionCard-modifForm-InputLarge"
                variant="standard"
                placeholder="Titre *"
                onChange={titreInput}
                style={{ width: 150 }}
                error={titreMissionInputError}
              />
            </div>

            <div className="MissionCard-element">
              <p className="MissionCard-Title-Modif">Utilisateur :</p>
            </div>

            <div className="MissionCard-element">
              <TextField
                id="standard-basic-select"
                select
                className="MissionCard-modifForm-Input"
                onChange={utilisateurInput}
                defaultValue="Default"
                variant="standard"
                style={{ width: 100 }}
                error={utilisateurMissionInputError}
              >
                <MenuItem value="Default">Coisir un utilisateur *</MenuItem>
                {lesUtilisateurs.map((unUtilisateur) => (
                  <MenuItem
                    key={unUtilisateur.idEmploye}
                    value={unUtilisateur.idEmploye}
                  >
                    {unUtilisateur.nomEmploye +
                      " " +
                      unUtilisateur.prenomEmploye}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="MissionCard-element">
              <p className="MissionCard-Title-Modif">Enclos :</p>
            </div>

            <div className="MissionCard-element">
              <TextField
                id="standard-basic-select"
                select
                className="MissionCard-modifForm-Input"
                onChange={enclosInput}
                defaultValue="Default"
                variant="standard"
                style={{ width: 100 }}
                error={enclosMissionInputError}
              >
                <MenuItem value="Default">Coisir un enclos *</MenuItem>
                {lesEnclos.map((unEnclos) => (
                  <MenuItem key={unEnclos.code} value={unEnclos.code}>
                    {unEnclos.code}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="MissionCard-element">
              <Button
                className="btn-suppr"
                variant="contained"
                size="medium"
                type="submit"
              >
                Valider
              </Button>
            </div>

            <div className="MissionCard-element">
              <Button
                className="btn-suppr"
                variant="contained"
                size="medium"
                onClick={handleAnnulerBtn}
              >
                Annuler
              </Button>
            </div>
          </div>
        </Box>
      ) : (
        <div className="AjoutUserCard">
          <div className="ajoutLink-box">
            <Link
              className="ajoutLink"
              underline="none"
              component="button"
              onClick={handleAjoutBtn}
            >
              <span className="ajoutLink-plus">+</span>
              <span className="ajoutLink-text">
                Ajouter une nouvelle mission
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAjoutMission;
