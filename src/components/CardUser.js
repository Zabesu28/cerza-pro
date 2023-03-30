import React, { useState, useEffect } from "react";
import "../styles/CardUser.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const CardUser = (props) => {
  const [moidifForm, setModifForm] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [lesFonctions, setLesFonctions] = useState([]);
  const [idFonctDefault, SetIdFonctDefault] = useState(0);
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

    setModifForm(true);
  };

  const handleAnnulerBtn = (event) => {
    event.preventDefault();

    setModifForm(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      {moidifForm ? (
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
              placeholder={props.User.nomEmploye}
              style={{ width: 100 }}
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
              placeholder={props.User.prenomEmploye}
              style={{ width: 100 }}
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
              placeholder={props.User.login}
              style={{ width: 100 }}
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
              style={{ width: 100 }}
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
              className="btn-modifier"
              variant="contained"
              size="medium"
              onClick={handleModifBtn}
            >
              Valider
            </Button>
          </div>

          <div className="UserCard-element">
            <Button
              className="btn-modifier"
              variant="contained"
              size="medium"
              onClick={handleAnnulerBtn}
            >
              Annuler
            </Button>
          </div>
        </div>
      ) : (
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
              <span className="UserCard-Title">Mot de passe :</span> ********
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
            <Button className="btn-suppr" variant="contained" size="medium">
              Supprimer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardUser;
