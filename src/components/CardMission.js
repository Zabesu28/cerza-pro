import React, { useState, useEffect } from "react";
import "../styles/CardMission.css";
import axios from "axios";
import { Button } from "@mui/material";

const CardMission = (props) => {
  const [lesUtilisateurs, setLesUtilisateurs] = useState([]);
  const [lesEnclos, setLesEnclos] = useState([]);

  const [isAttribue, setIsAttribuer] = useState([]);
  const [modifForm, setModifForm] = useState(false);
  const [supprForm, setSupprForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/")
      .then((res) => setLesFonctions(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/fonctions")
      .then((res) => setLesFonctions(res.data));
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

  const handleModifMission = (event) => {
    event.preventDefault();

    setModifForm(true);
    props.setIdModifMission(props.Mission.idMission);
    props.setIdSupprMission("");
  };

  const handleSupprMission = (event) => {
    event.preventDefault();

    setSupprForm(true);
    props.setIdSupprMission(props.Mission.idMission);
    props.setIdModifMission("");
  };

  return (
    <div>
      {modifForm ? (
        <div>
          <p>modif</p>
        </div>
      ) : (
        <div>
          {supprForm ? (
            <div>
              <p>suppr</p>
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
