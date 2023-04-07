import React, { useState, useEffect } from "react";
import "../styles/CardMission.css";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const CardMission = (props) => {
  const [lesUtilisateurs, setLesUtilisateurs] = useState([]);
  const [lesEnclos, setLesEnclos] = useState([]);

  const [isAttribue, setIsAttribuer] = useState([]);
  const [modifForm, setModifForm] = useState(false);
  const [supprForm, setSupprForm] = useState(false);

  const [titreMissionInput, setTitreMissionInput] = useState("");
  const [utilisateurMissionInput, setUtilisateurMissionInput] = useState("");
  const [enclosMissionInput, setEnclosMissionInput] = useState("");

  const [utilisateurMissionInputError, setUtilisateurMissionInputError] =
    useState(false);
  const [enclosMissionInputError, setEnclosMissionInputError] = useState(false);
  const [titreMissionInputError, setTitreMissionInputError] = useState(false);

  const [idUserAttribue, setIdUserAttribuer] = useState(0);

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

  if (
    (props.isModifMission !== "" &&
      props.isModifMission !== props.Mission.idMission &&
      modifForm) ||
    (props.isSupprMission !== "" &&
      props.isSupprMission !== props.Mission.idMission &&
      supprForm)
  ) {
    if (modifForm) {
      setModifForm(false);
    }

    if (supprForm) {
      setSupprForm(false);
    }
  }

  if (props.isModifMission === "" && modifForm) {
    setModifForm(false);
  }

  if (props.isSupprMission === "" && supprForm) {
    setSupprForm(false);
  }

  if (props.IsAjoutMission && modifForm) {
    setModifForm(false);
  }

  if (props.IsAjoutMission && supprForm) {
    setSupprForm(false);
  }

  useEffect(() => {
    axios
      .post(
        "http://localhost:4000/missions/" +
          props.Mission.idMission +
          "/isAttribuer"
      )
      .then((res) => {
        setIsAttribuer(res.data);
      });
  }, []);

  if (isAttribue.isAttribuer) {
    axios
      .post("http://localhost:4000/getIdUtilByNomPrenom", {
        nom: isAttribue.data[0].Employe[0].nomEmploye,
        prenom: isAttribue.data[0].Employe[0].prenomEmploye,
      })
      .then((res) => setIdUserAttribuer(parseInt(res.data[0].idEmploye)));
  }

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

    if (utilisateurMissionInputError) {
      setUtilisateurMissionInputError(false);
    }
  };

  const enclosInput = (event) => {
    event.preventDefault();

    setEnclosMissionInput(event.target.value);

    if (enclosMissionInputError) {
      setEnclosMissionInputError(false);
    }
  };

  const handleModifMission = (event) => {
    event.preventDefault();

    props.setIsAjoutMission(false);
    setModifForm(true);
    props.setIdModifMission(props.Mission.idMission);
    props.setIdSupprMission("");
  };

  const handleSupprMission = (event) => {
    event.preventDefault();

    props.setIsAjoutMission(false);
    setSupprForm(true);
    props.setIdSupprMission(props.Mission.idMission);
    props.setIdModifMission("");
  };

  const handleSubmitModif = async (event) => {
    event.preventDefault();

    let verifAttribution = false;

    if (isAttribue.isAttribuer) {
      if (
        utilisateurMissionInput === "Default" &&
        enclosMissionInput === "Default"
      ) {
        axios.delete(
          "http://localhost:4000/supprMission/attribuer/" +
            props.Mission.idMission
        );

        props.modifMission();
      } else if (
        utilisateurMissionInput !== "" &&
        utilisateurMissionInput !== "Default" &&
        enclosMissionInput === ""
      ) {
        axios.put(
          "http://localhost:4000/modifMission/attribuer/" +
            props.Mission.idMission,
          {
            idEmploye: utilisateurMissionInput,
            codeEnclos: "",
          }
        );

        props.modifMission();
      } else if (
        utilisateurMissionInput === "" &&
        enclosMissionInput !== "Default" &&
        enclosMissionInput !== ""
      ) {
        axios.put(
          "http://localhost:4000/modifMission/attribuer/" +
            props.Mission.idMission,
          {
            idEmploye: "",
            codeEnclos: enclosMissionInput,
          }
        );

        props.modifMission();
      } else if (
        utilisateurMissionInput !== "" &&
        utilisateurMissionInput !== "Default" &&
        enclosMissionInput !== "" &&
        enclosMissionInput !== "Default"
      ) {
        axios.put(
          "http://localhost:4000/modifMission/attribuer/" +
            props.Mission.idMission,
          {
            idEmploye: utilisateurMissionInput,
            codeEnclos: enclosMissionInput,
          }
        );

        props.modifMission();
      } else if (
        (utilisateurMissionInput === "" ||
          (utilisateurMissionInput !== "" &&
            utilisateurMissionInput !== "Default")) &&
        enclosMissionInput === "Default"
      ) {
        verifAttribution = true;
        setEnclosMissionInputError(true);
      } else if (
        (enclosMissionInput === "" ||
          (enclosMissionInput !== "" && enclosMissionInput !== "Default")) &&
        utilisateurMissionInput === "Default"
      ) {
        verifAttribution = true;
        setUtilisateurMissionInputError(true);
      }
    } else {
      if (
        utilisateurMissionInput !== "" &&
        utilisateurMissionInput !== "Default" &&
        enclosMissionInput !== "" &&
        enclosMissionInput !== "Default"
      ) {
        axios.post("http://localhost:4000/ajoutMission/attribuer/", {
          idEmploye: utilisateurMissionInput,
          idMission: props.Mission.idMission,
          codeEnclos: enclosMissionInput,
        });

        props.modifMission();
      } else if (
        (utilisateurMissionInput === "" ||
          utilisateurMissionInput === "Default") &&
        enclosMissionInput !== "" &&
        enclosMissionInput !== "Default"
      ) {
        verifAttribution = true;
        setUtilisateurMissionInputError(true);
      } else if (
        (enclosMissionInput === "" || enclosMissionInput === "Default") &&
        utilisateurMissionInput !== "" &&
        utilisateurMissionInput !== "Default"
      ) {
        verifAttribution = true;
        setEnclosMissionInputError(true);
      }
    }

    if (!verifAttribution && titreMissionInput !== "") {
      if (regTitreMission.test(titreMissionInput)) {
        await axios.put(
          "http://localhost:4000/modifMission/" + props.Mission.idMission,
          {
            libMission: titreMissionInput,
          }
        );

        props.modifMission();
      } else {
        setTitreMissionInputError(true);
      }
    }

    if (
      utilisateurMissionInput === "" &&
      enclosMissionInput === "" &&
      titreMissionInput === ""
    ) {
      alert(
        "Pour réaliser une modification, veuillez au moins saisir une donnée !"
      );
    }
  };

  const handleAnnulerBtn = (event) => {
    event.preventDefault();

    setModifForm(false);
    setSupprForm(false);

    setTitreMissionInput("");
    setUtilisateurMissionInput("");
    setEnclosMissionInput("");

    setEnclosMissionInputError(false);
    setUtilisateurMissionInputError(false);
    setTitreMissionInputError(false);
  };

  const handleSubmitSuppr = (event) => {
    event.preventDefault();
    axios.delete(
      "http://localhost:4000/supprMission/" + props.Mission.idMission
    );
    props.supprMission(props.Mission.idMission);
  };

  return (
    <div>
      {modifForm ? (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmitModif}
        >
          <div className="MissionCard-modifForm">
            <div className="MissionCard-element-large">
              <TextField
                id="standard-basic"
                className="MissionCard-modifForm-InputLarge"
                variant="standard"
                placeholder={props.Mission.libelleMission}
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
                defaultValue={
                  isAttribue.isAttribuer ? idUserAttribue : "Default"
                }
                variant="standard"
                style={{ width: 100 }}
                error={utilisateurMissionInputError}
              >
                <MenuItem value="Default">
                  {isAttribue.isAttribuer
                    ? "Supprimer"
                    : "Coisir un utilisateur"}
                </MenuItem>
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
                defaultValue={
                  isAttribue.isAttribuer
                    ? isAttribue.data[0].codeEnclos
                    : "Default"
                }
                variant="standard"
                style={{ width: 100 }}
                error={enclosMissionInputError}
              >
                <MenuItem value="Default">
                  {isAttribue.isAttribuer ? "Supprimer" : "Coisir un enclos"}
                </MenuItem>
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
        <div>
          {supprForm ? (
            <div className="MissionCard-supprForm">
              <div className="UserCard-element-large">
                <p>Voulez-vous supprimer cette mission ?</p>
              </div>

              <div className="MissionCard-element">
                <Button
                  className="btn-modifier"
                  variant="contained"
                  size="medium"
                  onClick={handleSubmitSuppr}
                >
                  Oui
                </Button>
              </div>

              <div className="MissionCard-element">
                <Button
                  className="btn-modifier"
                  variant="contained"
                  size="medium"
                  onClick={handleAnnulerBtn}
                >
                  Non
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="MissionCard">
                <div className="MissionCard-element-large">
                  <p>{props.Mission.libelleMission}</p>
                  {isAttribue.isAttribuer ? (
                    <div>
                      <p>
                        <span className="MissionCard-Title">
                          Date d'atribution :
                        </span>
                        {" " + isAttribue.data[0].dateAttribuer}
                      </p>
                      <p>
                        <span className="MissionCard-Title">Employe :</span>
                        {" " +
                          isAttribue.data[0].Employe[0].nomEmploye +
                          " " +
                          isAttribue.data[0].Employe[0].prenomEmploye}
                      </p>
                      <p>
                        <span className="MissionCard-Title">
                          Code de l'enclos :
                        </span>
                        {" " + isAttribue.data[0].codeEnclos}
                      </p>
                      {isAttribue.data[0].etat !== "En cours" ? (
                        <div>
                          <p>
                            <span className="MissionCard-Title">
                              Date de validation :
                            </span>
                            {" " + isAttribue.data[0].dateValidation}
                          </p>
                          <p>
                            <span className="MissionCard-Title">Etat :</span>
                            {" " + isAttribue.data[0].etat}
                          </p>
                          <p>
                            <span className="MissionCard-Title">
                              Commentaire :
                            </span>
                            {" " + isAttribue.data[0].commentaire}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="MissionCard-element">
                  <Button
                    className="btn-modifier"
                    variant="contained"
                    size="medium"
                    onClick={handleModifMission}
                  >
                    Modifier
                  </Button>
                </div>

                <div className="MissionCard-element">
                  <Button
                    className="btn-suppr"
                    variant="contained"
                    size="medium"
                    onClick={handleSupprMission}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardMission;
