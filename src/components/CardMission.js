import React, { useState, useEffect } from "react";
import "../styles/CardMission.css";
import axios from "axios";

const CardMission = (props) => {
  const [isAttribue, setIsAttribuer] = useState([]);

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

  return (
    <div className="MissionCard">
      <div className="MissionCard-element-large">
        <p>{props.Mission.libelleMission}</p>
        {isAttribue.isAttribuer ? (
          <div>
            <p>
              <span className="MissionCard-Title">Date d'atribution :</span>{" "}
              {isAttribue.data[0].dateAttribuer}
            </p>
            <p>
              <span className="MissionCard-Title">Employe :</span>
              {" " +
                isAttribue.data[0].Employe[0].nomEmploye +
                " " +
                isAttribue.data[0].Employe[0].prenomEmploye}{" "}
            </p>
            <p>
              <span className="MissionCard-Title">Code de l'enclos :</span>{" "}
              {isAttribue.data[0].codeEnclos}
            </p>
            {isAttribue.data[0].etat !== "En cours" ? (
              <div>
                <p>
                  <span className="MissionCard-Title">
                    Date de validation :
                  </span>{" "}
                  {isAttribue.data[0].dateValidation}
                </p>
                <p>
                  <span className="MissionCard-Title">Etat :</span>{" "}
                  {isAttribue.data[0].etat}
                </p>
                <p>
                  <span className="MissionCard-Title">Commentaire :</span>{" "}
                  {isAttribue.data[0].commentaire}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CardMission;
