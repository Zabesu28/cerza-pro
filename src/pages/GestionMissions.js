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

  const trierMissions = (filtre) => {
    let trieDesMissions = [...lesMissionsNonFiltrer];

    console.log(trieDesMissions);

    if (filtre.dateAttrFiltre !== null) {
    }

    if (filtre.dateValidFiltre !== null) {
    }

    if (filtre.employeFiltre !== "Default") {
    }

    if (filtre.enclosFiltre !== "Default") {
    }

    if (filtre.etatFiltre !== "Default") {
    }
    // if (filtre.nomFiltre !== "") {
    //   trieDesComptes = trieDesComptes.filter((unCompte) =>
    //     unCompte.nomEmploye.toLowerCase().includes(filtre.nomFiltre)
    //   );
    // }

    // if (filtre.prenomFiltre !== "") {
    //   trieDesComptes = trieDesComptes.filter((unCompte) =>
    //     unCompte.prenomEmploye.toLowerCase().includes(filtre.prenomFiltre)
    //   );
    // }

    // if (filtre.identifiantFiltre !== "") {
    //   trieDesComptes = trieDesComptes.filter((unCompte) =>
    //     unCompte.login.toLowerCase().includes(filtre.identifiantFiltre)
    //   );
    // }

    // if (filtre.fonctionFiltre !== "Default") {
    //   trieDesComptes = trieDesComptes.filter(
    //     (unCompte) => unCompte.libelleFonction === filtre.fonctionFiltre
    //   );
    // }

    setLesMissions(trieDesMissions);
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
