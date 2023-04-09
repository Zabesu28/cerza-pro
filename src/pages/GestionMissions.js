import React, { useState, useEffect } from "react";
import "../styles/GestionMissions.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import CardMission from "../components/CardMission";
import CardAjoutMission from "../components/CardAjoutMission";
import FiltreMission from "../components/FiltreMission";

const GestionMissions = () => {
  const [lesMissions, setLesMissions] = useState([]);
  const [lesMissionsNonFiltrer, setLesMissionsNonFiltrer] = useState([]);
  const [IdModifMission, setIdModifMission] = useState("");
  const [IdSupprMission, setIdSupprMission] = useState("");
  const [IsAjoutMission, setIsAjoutMission] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/missions").then((res) => {
      setLesMissions(res.data);
      setLesMissionsNonFiltrer(res.data);
    });
  }, []);

  const supprMission = (id) => {
    const copieDesMissions = [...lesMissions];

    const updateLesMissions = copieDesMissions.filter(
      (uneMission) => uneMission.idMission !== id
    );

    setLesMissions(updateLesMissions);
  };

  const modifMission = () => {
    setLesMissions([]);
    axios.get("http://localhost:4000/missions").then((res) => {
      setLesMissions(res.data);
    });
  };

  const ajoutMission = (id, titre) => {
    const copieDesMissions = [...lesMissions];

    let nvlleMission = {
      idMission: id,
      libelleMission: titre,
    };

    copieDesMissions.push(nvlleMission);

    setLesMissions(copieDesMissions);
  };

  const annulerFiltre = () => {
    setLesMissions(lesMissionsNonFiltrer);
  };

  const trierMissions = async (filtre) => {
    let trieDesMissions = [...lesMissionsNonFiltrer];
    let missionsAttr = [];
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    for (let uneMission of trieDesMissions) {
      await axios
        .post(
          "http://localhost:4000/missions/" +
            uneMission.idMission +
            "/isAttribuer"
        )
        .then((res) => {
          if (res.data.isAttribuer) {
            let mission = {
              idMission: uneMission.idMission,
              libelleMission: uneMission.libelleMission,
              isAttribuer: res.data.isAttribuer,
              data: res.data.data,
            };

            if (mission.data[0].dateAttribuer !== null) {
              mission.data[0].dateAttribuer =
                mission.data[0].dateAttribuer.substring(
                  0,
                  mission.data[0].dateAttribuer.indexOf("à") - 1
                );
            }

            if (mission.data[0].dateValidation !== null) {
              mission.data[0].dateValidation =
                mission.data[0].dateValidation.substring(
                  0,
                  mission.data[0].dateValidation.indexOf("à") - 1
                );
            }

            missionsAttr.push(mission);
          } else {
            missionsAttr.push({
              idMission: uneMission.idMission,
              libelleMission: uneMission.libelleMission,
              isAttribuer: res.data.isAttribuer,
            });
          }
        });
    }

    if (filtre.dateAttrFiltre !== null) {
      const dateAttrFiltre = new Date(filtre.dateAttrFiltre).toLocaleDateString(
        "fr-FR",
        options
      );

      missionsAttr = missionsAttr.filter(
        (uneMission) =>
          uneMission.isAttribuer &&
          uneMission.data[0].dateAttribuer === dateAttrFiltre
      );
    }

    if (filtre.dateValidFiltre !== null) {
      const dateValidFiltre = new Date(
        filtre.dateValidFiltre
      ).toLocaleDateString("fr-FR", options);

      missionsAttr = missionsAttr.filter(
        (uneMission) =>
          uneMission.isAttribuer &&
          uneMission.data[0].dateValidation === dateValidFiltre
      );
    }

    if (filtre.employeFiltre !== "Default") {
      let employeFiltre = {
        nom: "",
        prenom: "",
      };

      await axios
        .get("http://localhost:4000/utilisateurs/" + filtre.employeFiltre)
        .then((res) => {
          employeFiltre.nom = res.data[0].nomEmploye;
          employeFiltre.prenom = res.data[0].prenomEmploye;
        });

      missionsAttr = missionsAttr.filter(
        (uneMission) =>
          uneMission.isAttribuer &&
          uneMission.data[0].Employe[0].nomEmploye === employeFiltre.nom &&
          uneMission.data[0].Employe[0].prenomEmploye === employeFiltre.prenom
      );
    }

    if (filtre.enclosFiltre !== "Default") {
      missionsAttr = missionsAttr.filter(
        (uneMission) =>
          uneMission.isAttribuer &&
          uneMission.data[0].codeEnclos === filtre.enclosFiltre
      );
    }

    if (filtre.etatFiltre !== "Default") {
      let etatLib = "";

      if (filtre.etatFiltre !== "nonAttribuee") {
        await axios
          .get("http://localhost:4000/etatsMission/" + filtre.etatFiltre)
          .then((res) => {
            etatLib = res.data[0].libelleEtat;
          });
      } else {
        etatLib = filtre.etatFiltre;
      }

      if (etatLib === "nonAttribuee") {
        missionsAttr = missionsAttr.filter(
          (uneMission) => !uneMission.isAttribuer
        );
      } else {
        missionsAttr = missionsAttr.filter(
          (uneMission) =>
            uneMission.isAttribuer && uneMission.data[0].etat === etatLib
        );
      }
    }

    setLesMissions(missionsAttr);
  };

  if (
    localStorage.getItem("userConnected") !== null &&
    JSON.parse(localStorage.getItem("userConnected")).droitCnx ===
      "Administrateur"
  ) {
    return (
      <div>
        <Navbar />
        <FiltreMission
          annulerFiltre={annulerFiltre}
          trierMissions={trierMissions}
        />
        <div className="allMissionsCards-Grid">
          {lesMissions.map((uneMission) => (
            <div key={uneMission.idMission} className="MissionCard-Only">
              <CardMission
                Mission={uneMission}
                isModifMission={IdModifMission}
                setIdModifMission={setIdModifMission}
                isSupprMission={IdSupprMission}
                setIdSupprMission={setIdSupprMission}
                supprMission={supprMission}
                modifMission={modifMission}
                IsAjoutMission={IsAjoutMission}
                setIsAjoutMission={setIsAjoutMission}
              />
            </div>
          ))}
          <div className="MissionCard-Only">
            <CardAjoutMission
              IsAjoutMission={IsAjoutMission}
              setIsAjoutMission={setIsAjoutMission}
              ajoutMission={ajoutMission}
            />
          </div>
        </div>
      </div>
    );
  } else {
    if (
      localStorage.getItem("userConnected") !== null &&
      JSON.parse(localStorage.getItem("userConnected")).droitCnx !==
        "Administrateur"
    ) {
      window.location.replace("/home");
    } else {
      window.location.replace("/authAdmin");
    }
  }
};

export default GestionMissions;
