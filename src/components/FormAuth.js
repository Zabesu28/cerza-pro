import React, { useState } from "react";
import "../styles/FormAuth.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const FormAuth = (typeForm) => {
  const navigate = useNavigate();
  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");
  const [idInputError, setIdInputError] = useState(false);
  const [mdpInputError, setMdpInputError] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  let regIdentifiant = new RegExp(/^[a-zA-Z0-9]{4,}$/);
  let regMDP = new RegExp(
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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

  const HandleSubmit = (event) => {
    event.preventDefault();

    if (identifiant === "" || !regIdentifiant.test(identifiant)) {
      setIdInputError(true);
    }

    if (mdp === "" || !regMDP.test(mdp)) {
      setMdpInputError(true);
    }

    if (
      mdp !== "" &&
      regMDP.test(mdp) &&
      identifiant !== "" &&
      regIdentifiant.test(identifiant)
    ) {
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
                navigate("/");
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
                navigate("/");
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
    <div className="FormAuth-flex">
      <div className="FormAuth-flex-element">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={HandleSubmit}
        >
          <div className="FormAuth-grid">
            <div className="FormAuth-grid-element">
              <TextField
                id="identifiant"
                label="Identifiant"
                variant="outlined"
                className="inputLoginform"
                onChange={inputIdentifiant}
                required
                error={idInputError}
                style={{ width: 225 }}
              />
            </div>

            <div className="FormAuth-grid-element">
              <TextField
                id="mdp"
                label="Mot de passe"
                variant="outlined"
                onChange={inputMdp}
                className="inputMdpform"
                required
                error={mdpInputError}
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
                style={{ width: 225 }}
              />
            </div>

            <div className="FormAuth-grid-element">
              <Button
                className="btn-AuthForm"
                variant="contained"
                size="medium"
                type="submit"
              >
                Connexion
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default FormAuth;
