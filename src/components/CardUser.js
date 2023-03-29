import React from "react";
import "../styles/CardUser.css";
import Button from "@mui/material/Button";

const CardUser = (props) => {
  return (
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
        <Button className="btn-modifier" variant="contained" size="medium">
          Modifier
        </Button>
      </div>

      <div className="UserCard-element">
        <Button className="btn-suppr" variant="contained" size="medium">
          Supprimer
        </Button>
      </div>
    </div>
  );
};

export default CardUser;
