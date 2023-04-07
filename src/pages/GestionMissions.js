import React, { useState, useEffect } from "react";
import "../styles/GestionMissions.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import CardMission from "../components/CardMission";

const GestionMissions = () => {
  const [lesMissions, setLesMissions] = useState([]);
  const [IdModifMission, setIdModifMission] = useState("");
  const [IdSupprMission, setIdSupprMission] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/missions").then((res) => {
      setLesMissions(res.data);
    });
  }, []);

  const supprMission = (id) => {
    const copieDesMissions = [...lesMissions];

    const updateLesMissions = copieDesMissions.filter(
      (uneMission) => uneMission.idMission !== id
    );

    setLesMissions(updateLesMissions);
  };

  const modifMission = (libMission, id) => {
    const copieDesMissions = [...lesMissions];
    const updateLesMissions = [];

    console.log(libMission + " " + id);

    for (let uneMission of copieDesMissions) {
      if (uneMission.idMission !== id) {
        updateLesMissions.push(uneMission);
      } else {
        if (libMission !== "") {
          updateLesMissions.push({
            idMission: id,
            libelleMission: libMission,
          });
        } else {
          updateLesMissions.push({
            idMission: id,
            libelleMission: uneMission.libelleMission,
          });
        }
      }
    }

    setLesMissions(updateLesMissions);
  };

  return (
    <div>
      <Navbar />
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionMissions;
