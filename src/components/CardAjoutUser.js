import React, { useState, useEffect } from "react";
import "../styles/CardAjoutUser.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { Link } from "@mui/joy";

const CardAjoutUser = (props) => {
  const [ajoutForm, setAjoutForm] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [lesFonctions, setLesFonctions] = useState([]);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");
  const [fonction, setFonction] = useState("");

  const [idInputError, setIdInputError] = useState(false);
  const [mdpInputError, setMdpInputError] = useState(false);
  const [nomInputError, setNomInputError] = useState(false);
  const [prenomInputError, setPrenomInputError] = useState(false);
  const [fonctionInputError, setFonctionInputError] = useState(false);

  let regNomPrenom = new RegExp(/^[a-zA-Z]{3,}$/);
  let regIdentifiant = new RegExp(/^[a-zA-Z0-9]{4,}$/);
  let regMDP = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );

  useEffect(() => {
    axios
      .get("http://localhost:4000/fonctions")
      .then((res) => setLesFonctions(res.data));
  }, []);

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

    if (
      (event.target.value !== "default" || event.target.value !== "") &&
      fonctionInputError
    ) {
      setFonctionInputError(false);
    }
  };

  const handleAnnulerBtn = (event) => {
    event.preventDefault();

    setNom("");
    setPrenom("");
    setIdentifiant("");
    setMdp("");
    setFonction("");
    setIdInputError(false);
    setMdpInputError(false);
    setNomInputError(false);
    setPrenomInputError(false);
    setFonctionInputError(false);
    setAjoutForm(false);
  };

  const handleSubmitAjout = async (event) => {
    event.preventDefault();

    if (identifiant === "" || !regIdentifiant.test(identifiant)) {
      await setIdInputError(true);
    }

    if (mdp === "" || !regMDP.test(mdp)) {
      await setMdpInputError(true);
    }

    if (nom === "" || !regNomPrenom.test(nom)) {
      await setNomInputError(true);
    }

    if (prenom === "" || !regNomPrenom.test(prenom)) {
      await setPrenomInputError(true);
    }

    if (fonction === "default" || fonction === "") {
      await setFonctionInputError(true);
    }

    if (
      identifiant !== "" &&
      regIdentifiant.test(identifiant) &&
      mdp !== "" &&
      regMDP.test(mdp) &&
      nom !== "" &&
      regNomPrenom.test(nom) &&
      prenom !== "" &&
      regNomPrenom.test(nom) &&
      fonction !== "default" &&
      fonction !== ""
    ) {
      let verifUtilExiste = false;

      await axios
        .post("http://localhost:4000/verifUtilExist", {
          nom: "",
          prenom: "",
          identifiant: identifiant,
        })
        .then((res) => {
          verifUtilExiste = res.data.isExist;
        });

      if (!verifUtilExiste) {
        await axios.post("http://localhost:4000/ajoutUtil", {
          nom: nom,
          prenom: prenom,
          identifiant: identifiant,
          password: mdp,
          fonction: fonction,
        });

        let idNvCompte = 0;
        let libFonctionNvCompte = "";

        await axios
          .post("http://localhost:4000/getIdUtilByIdentifiant", {
            identifiant: identifiant,
          })
          .then((res) => (idNvCompte = parseInt(res.data[0].idEmploye)));

        await axios
          .get("http://localhost:4000/fonctions/" + fonction)
          .then((res) => (libFonctionNvCompte = res.data[0].libelleFonction));

        props.Ajout(
          {
            nom: nom,
            prenom: prenom,
            identifiant: identifiant,
            fonction: libFonctionNvCompte,
          },
          idNvCompte
        );

        setAjoutForm(false);
      } else {
        alert(
          "L'identifiant que vous avez saisi correspond déjà à un utilisateur existant, veuillez en saisir un autre !"
        );
      }
    } else {
      alert(
        "Erreur lors de l'ajout de cet utilisateur, veuillez vérifier que vous avez saisi toutes les données nécessaires et qu'elles sont correctes !"
      );
    }
  };

  const handleAjoutBtn = (event) => {
    event.preventDefault();

    setAjoutForm(true);
    props.setIsAjout(true);
  };

  if (!props.isAjout && ajoutForm) {
    setAjoutForm(false);
  }

  return (
    <div>
      {ajoutForm ? (
        <div className="AjoutUserCard">
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmitAjout}
          >
            <div className="AjoutUserCard-ajoutForm">
              <div className="AjoutUserCard-element">
                <p className="AjoutUserCard-Title-Ajout">
                  <span className="AjoutUserCard-Title">Nom :</span>
                </p>
              </div>

              <div className="AjoutUserCard-element">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  placeholder="Nom *"
                  className="AddUser-Form"
                  style={{ width: 100 }}
                  onChange={inputNom}
                  error={nomInputError}
                />
              </div>

              <div className="AjoutUserCard-element">
                <p className="AjoutUserCard-Title-Ajout">
                  <span className="AjoutUserCard-Title">Prénom :</span>
                </p>
              </div>

              <div className="AjoutUserCard-element">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  placeholder="Prénom *"
                  style={{ width: 100 }}
                  className="AddUser-Form"
                  onChange={inputPrenom}
                  error={prenomInputError}
                />
              </div>

              <div className="AjoutUserCard-element">
                <p className="AjoutUserCard-Title-Ajout">
                  <span className="AjoutUserCard-Title">Identifiant :</span>
                </p>
              </div>

              <div className="AjoutUserCard-element">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  placeholder="Identifiant *"
                  style={{ width: 100 }}
                  className="AddUser-Form"
                  onChange={inputIdentifiant}
                  error={idInputError}
                />
              </div>

              <div className="AjoutUserCard-element">
                <p className="AjoutUserCard-Title-Ajout">
                  <span className="AjoutUserCard-Title">Mot de passe :</span>
                </p>
              </div>

              <div className="AjoutUserCard-element">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  placeholder="******** *"
                  className="AddUser-Form"
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

              <div className="AjoutUserCard-element">
                <p className="AjoutUserCard-Title-Ajout">
                  <span className="AjoutUserCard-Title">Fonction :</span>
                </p>
              </div>

              <div className="AjoutUserCard-element">
                <TextField
                  id="standard-basic-select"
                  select
                  defaultValue="default"
                  variant="standard"
                  className="AddUser-Form"
                  style={{ width: 100 }}
                  onChange={inputFonction}
                  error={fonctionInputError}
                >
                  <MenuItem value="default">Choisir une fonction *</MenuItem>

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

              <div className="AjoutUserCard-element">
                <Button
                  className="btn-ajout"
                  variant="contained"
                  size="medium"
                  type="submit"
                >
                  Valider
                </Button>
              </div>

              <div className="AjoutUserCard-element">
                <Button
                  className="btn-annulerAjout"
                  variant="contained"
                  size="medium"
                  onClick={handleAnnulerBtn}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </Box>
        </div>
      ) : (
        <div className="AjoutUserCard-link">
          <div className="ajoutLink-box">
            <Link
              className="ajoutLink"
              underline="none"
              component="button"
              onClick={handleAjoutBtn}
            >
              <span className="ajoutLink-plus">+</span>
              <span className="ajoutLink-text">Ajouter un nouveau compte</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAjoutUser;
