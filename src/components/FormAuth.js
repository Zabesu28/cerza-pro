import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const FormAuth = (typeForm) => {
  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");
  const [idInputError, setIdInputError] = useState(false);
  const [mdpInputError, setMdpInputError] = useState(false);

  let regIdentifiant = new RegExp(/^[a-zA-Z0-9]{4,}$/);
  let regMDP = new RegExp(
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );

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

  const HandleSubmit = (event) => {
    event.preventDefault();

    if (identifiant === "" || !regIdentifiant.test(identifiant)) {
      setIdInputError(true);
    }

    if (mdp === "" || !regMDP.test(mdp)) {
      setMdpInputError(true);
    }

    if (!mdpInputError && !idInputError) {
      axios
        .post("http://localhost:4000/verifCnx", {
          identifiant: identifiant,
          password: mdp,
        })
        .then((res) => {
          if (!res.data.cnx_valid) {
            alert(
              "Mot de passe ou identifiant incorrecte, veuillez les vérifier et les resaisir !"
            );
          } else {
            if (parseInt(typeForm.typeForm) === 0) {
              if (res.data.cnx_droit === "Administrateur") {
                localStorage.setItem(
                  "userConnected",
                  JSON.stringify({
                    idCnx: res.data.cnx_login,
                    droitCnx: res.data.cnx_droit,
                  })
                );
              } else {
                alert(
                  "Vous ne disposez pas des droits pour vous connecter en tant qu'administrateur !"
                );
              }
            } else {
              if (res.data.cnx_droit !== "Administrateur") {
                localStorage.setItem(
                  "userConnected",
                  JSON.stringify({
                    idCnx: res.data.cnx_login,
                    droitCnx: res.data.cnx_droit,
                  })
                );
              } else {
                alert(
                  "En tant qu'administrateur, veuillez vous connecter sur l'interface d'authentification prévu à cette effet !"
                );
              }
            }
          }
        });
    }
  };

  return (
    <div>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={HandleSubmit}
      >
        <TextField
          id="identifiant"
          label="Identifiant"
          variant="outlined"
          onChange={inputIdentifiant}
          required
          error={idInputError}
        />

        <TextField
          id="mdp"
          label="Mot de passe"
          variant="outlined"
          onChange={inputMdp}
          required
          error={mdpInputError}
        />

        <Button variant="contained" size="medium" type="submit">
          Connexion
        </Button>
      </Box>
    </div>
  );
};

export default FormAuth;
