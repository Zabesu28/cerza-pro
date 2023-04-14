import React, { useState, useEffect } from "react";
import "../styles/CardUser.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const CardUser = (props) => {
  const [modifForm, setModifForm] = useState(false);
  const [supprForm, setSupprForm] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [lesFonctions, setLesFonctions] = useState([]);
  const [idFonctDefault, SetIdFonctDefault] = useState(0);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");
  const [fonction, setFonction] = useState("");

  const [idInputError, setIdInputError] = useState(false);
  const [mdpInputError, setMdpInputError] = useState(false);
  const [nomInputError, setNomInputError] = useState(false);
  const [prenomInputError, setPrenomInputError] = useState(false);

  let regNomPrenom = new RegExp(/^[a-zA-Z]{3,}$/);
  let regIdentifiant = new RegExp(/^[a-zA-Z0-9]{4,}$/);
  let regMDP = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );

  if (
    (props.isModif !== "" &&
      props.isModif !== props.User.idEmploye &&
      modifForm) ||
    (props.isSuppr !== "" &&
      props.isSuppr !== props.User.idEmploye &&
      supprForm)
  ) {
    if (modifForm) {
      setModifForm(false);
    }

    if (supprForm) {
      setSupprForm(false);
    }
  }

  if (props.isModif === "" && modifForm) {
    setModifForm(false);
  }

  if (props.isSuppr === "" && supprForm) {
    setSupprForm(false);
  }

  if (props.isAjout && modifForm) {
    setModifForm(false);
  }

  if (props.isAjout && supprForm) {
    setSupprForm(false);
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000/fonctions")
      .then((res) => setLesFonctions(res.data));
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:4000/getIdFonctionByLibelle", {
        libFonction: props.User.libelleFonction,
      })
      .then((res) => SetIdFonctDefault(parseInt(res.data[0].idFonction)));
  }, []);

  const handleModifBtn = (event) => {
    event.preventDefault();

    props.setIsAjout(false);
    setModifForm(true);
    props.setIdModif(props.User.idEmploye);
    props.setIdSuppr("");
  };

  const handleSupprBtn = (event) => {
    event.preventDefault();

    props.setIsAjout(false);
    setSupprForm(true);
    props.setIdSuppr(props.User.idEmploye);
    props.setIdModif("");
  };

  const handleAnnulerBtn = (event) => {
    event.preventDefault();

    setModifForm(false);
    setNom("");
    setPrenom("");
    setIdentifiant("");
    setMdp("");
    setFonction("");
    setIdInputError(false);
    setMdpInputError(false);
    setNomInputError(false);
    setPrenomInputError(false);
    setSupprForm(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const inputNom = (event) => {
    event.preventDefault();
    setNom(event.target.value.trim().toUpperCase());

    if (event.target.value.trim() !== "" && nomInputError) {
      setNomInputError(false);
    }
  };

  const inputPrenom = (event) => {
    event.preventDefault();
    setPrenom(
      event.target.value.trim().charAt(0).toUpperCase() +
        event.target.value.trim().substring(1).toLowerCase()
    );

    if (event.target.value.trim() !== "" && prenomInputError) {
      setPrenomInputError(false);
    }
  };

  const inputIdentifiant = (event) => {
    event.preventDefault();
    setIdentifiant(event.target.value.trim());

    if (event.target.value.trim() !== "" && idInputError) {
      setIdInputError(false);
    }
  };

  const inputMdp = (event) => {
    event.preventDefault();
    setMdp(event.target.value.trim());

    if (event.target.value.trim() !== "" && mdpInputError) {
      setMdpInputError(false);
    }
  };

  const inputFonction = (event) => {
    event.preventDefault();
    setFonction(event.target.value);
  };

  const handleSubmitModif = async (event) => {
    event.preventDefault();

    if (identifiant !== "" && !regIdentifiant.test(identifiant)) {
      await setIdInputError(true);
    }

    if (mdp !== "" && !regMDP.test(mdp)) {
      await setMdpInputError(true);
    }

    if (nom !== "" && !regNomPrenom.test(nom)) {
      await setNomInputError(true);
    }

    if (prenom !== "" && !regNomPrenom.test(prenom)) {
      await setPrenomInputError(true);
    }

    if (
      nom === "" &&
      prenom === "" &&
      mdp === "" &&
      identifiant === "" &&
      fonction === ""
    ) {
      alert(
        "Pour réaliser une modification, veuillez au moins saisir une donnée !"
      );
    } else {
      let bodyModif = {
        nom: "",
        prenom: "",
        identifiant: "",
        password: "",
        fonction: "",
      };

      let verifIdentifiant = false;
      let verifMdp = false;
      let verifNom = false;
      let verifPrenom = false;

      if (identifiant !== "") {
        verifIdentifiant = true;
        if (regIdentifiant.test(identifiant)) {
          bodyModif.identifiant = identifiant;
          verifIdentifiant = false;
        }
      }

      if (mdp !== "") {
        verifMdp = true;
        if (regMDP.test(mdp)) {
          bodyModif.password = mdp;
          verifMdp = false;
        }
      }

      if (nom !== "") {
        verifNom = true;
        if (regNomPrenom.test(nom)) {
          bodyModif.nom = nom;
          verifNom = false;
        }
      }

      if (prenom !== "") {
        verifPrenom = true;
        if (regNomPrenom.test(prenom)) {
          bodyModif.prenom = prenom;
          verifPrenom = false;
        }
      }

      if (fonction !== "") {
        bodyModif.fonction = fonction;
      }

      if (!verifNom && !verifPrenom && !verifIdentifiant && !verifMdp) {
        let verifUtilExiste = false;

        if (bodyModif.identifiant !== "") {
          await axios
            .post("http://localhost:4000/verifUtilExist", {
              nom: "",
              prenom: "",
              identifiant: bodyModif.identifiant,
            })
            .then((res) => {
              verifUtilExiste = res.data.isExist;
            });
        }

        if (!verifUtilExiste) {
          if (
            JSON.parse(localStorage.getItem("userConnected")).idCnx ===
              props.User.login &&
            bodyModif.fonction !== ""
          ) {
            alert(
              "Vous ne pouvez pas modifier le droit de votre propre compte !"
            );
          } else {
            axios.put(
              "http://localhost:4000/modifUtil/" + props.User.idEmploye,
              bodyModif
            );

            if (bodyModif.nom === "") {
              bodyModif.nom = props.User.nomEmploye;
            }

            if (bodyModif.prenom === "") {
              bodyModif.prenom = props.User.prenomEmploye;
            }

            if (bodyModif.identifiant === "") {
              bodyModif.identifiant = props.User.login;
            }

            if (bodyModif.fonction === "") {
              bodyModif.fonction = props.User.libelleFonction;
            } else {
              await axios
                .get("http://localhost:4000/fonctions/" + bodyModif.fonction)
                .then(
                  (res) => (bodyModif.fonction = res.data[0].libelleFonction)
                );
            }

            props.Modif(bodyModif, props.User.idEmploye);

            setModifForm(false);
          }
        } else {
          alert(
            "L'identifiant que vous avez saisi correspond déjà à un utilisateur existant, veuillez en saisir un autre !"
          );
        }
      }
    }
  };

  const handleSubmitSuppr = (event) => {
    event.preventDefault();
    if (
      JSON.parse(localStorage.getItem("userConnected")).idCnx !==
      props.User.login
    ) {
      axios.delete("http://localhost:4000/supprUtil/" + props.User.idEmploye);
      props.Suppr(props.User.idEmploye);
    } else {
      alert("Vous ne pouvez pas supprimer votre propre compte !");
    }
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
          <div className="UserCard-modifForm">
            <div className="UserCard-element">
              <p className="UserCard-Title-Modif">
                <span className="UserCard-Title">Nom :</span>
              </p>
            </div>

            <div className="UserCard-element">
              <TextField
                id="standard-basic"
                variant="standard"
                className="formUser-Form"
                placeholder={props.User.nomEmploye}
                style={{ width: 100 }}
                onChange={inputNom}
                error={nomInputError}
              />
            </div>

            <div className="UserCard-element">
              <p className="UserCard-Title-Modif">
                <span className="UserCard-Title">Prénom :</span>
              </p>
            </div>

            <div className="UserCard-element">
              <TextField
                id="standard-basic"
                variant="standard"
                className="formUser-Form"
                placeholder={props.User.prenomEmploye}
                style={{ width: 100 }}
                onChange={inputPrenom}
                error={prenomInputError}
              />
            </div>

            <div className="UserCard-element">
              <p className="UserCard-Title-Modif">
                <span className="UserCard-Title">Identifiant :</span>
              </p>
            </div>

            <div className="UserCard-element">
              <TextField
                id="standard-basic"
                variant="standard"
                className="formUser-Form"
                placeholder={props.User.login}
                style={{ width: 100 }}
                onChange={inputIdentifiant}
                error={idInputError}
              />
            </div>

            <div className="UserCard-element">
              <p className="UserCard-Title-Modif">
                <span className="UserCard-Title">Mot de passe :</span>
              </p>
            </div>

            <div className="UserCard-element">
              <TextField
                id="standard-basic"
                variant="standard"
                className="formUser-Form"
                placeholder="********"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                style={{ width: 100 }}
                onChange={inputMdp}
                error={mdpInputError}
              />
            </div>

            <div className="UserCard-element">
              <p className="UserCard-Title-Modif">
                <span className="UserCard-Title">Fonction :</span>
              </p>
            </div>

            <div className="UserCard-element">
              <TextField
                id="standard-basic-select"
                select
                defaultValue={idFonctDefault}
                variant="standard"
                className="formUser-Form"
                style={{ width: 100 }}
                onChange={inputFonction}
              >
                {lesFonctions.map((uneFonction) => (
                  <MenuItem
                    key={uneFonction.idFonction}
                    value={uneFonction.idFonction}
                  >
                    {uneFonction.libelleFonction}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="UserCard-element">
              <Button
                className="btn-valid"
                variant="contained"
                size="medium"
                type="submit"
              >
                Valider
              </Button>
            </div>

            <div className="UserCard-element">
              <Button
                className="btn-annul"
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
            <div className="UserCard-supprForm">
              <div className="UserCard-element-large">
                <p>Voulez-vous supprimer cet utilisateur ?</p>
              </div>

              <div className="UserCard-element">
                <Button
                  className="btn-oui"
                  variant="contained"
                  size="medium"
                  onClick={handleSubmitSuppr}
                >
                  Oui
                </Button>
              </div>

              <div className="UserCard-element">
                <Button
                  className="btn-non"
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
              <div className="UserCard">
                <div className="UserCard-element-large">
                  <p>
                    <span className="UserCard-Title">Nom :</span>
                    {" " + props.User.nomEmploye}
                  </p>
                  <p>
                    <span className="UserCard-Title">Prénom :</span>
                    {" " + props.User.prenomEmploye}
                  </p>
                  <p>
                    <span className="UserCard-Title">Identifiant :</span>
                    {" " + props.User.login}
                  </p>
                  <p>
                    <span className="UserCard-Title">Mot de passe :</span>{" "}
                    ********
                  </p>
                  <p>
                    <span className="UserCard-Title">Fonction :</span>
                    {" " + props.User.libelleFonction}
                  </p>
                </div>

                <div className="UserCard-element">
                  <Button
                    className="btn-modifier"
                    variant="contained"
                    size="medium"
                    onClick={handleModifBtn}
                  >
                    Modifier
                  </Button>
                </div>

                <div className="UserCard-element">
                  <Button
                    className="btn-suppr"
                    variant="contained"
                    size="medium"
                    onClick={handleSupprBtn}
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

export default CardUser;
