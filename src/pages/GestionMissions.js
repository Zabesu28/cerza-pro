import React, { useState, useEffect } from "react";
import "../styles/GestionMissions.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import CardMission from "../components/CardMission";
import CardAjoutMission from "../components/CardAjoutMission";

const GestionMissions = () => {
  const [lesMissions, setLesMissions] = useState([]);
  const [IdModifMission, setIdModifMission] = useState("");
  const [IdSupprMission, setIdSupprMission] = useState("");
  const [IsAjoutMission, setIsAjoutMission] = useState(false);

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

  const modifMission = () => {
    setLesMissions([]);
    axios.get("http://localhost:4000/missions").then((res) => {
      setLesMissions(res.data);
    });
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
              IsAjoutMission={IsAjoutMission}
              setIsAjoutMission={setIsAjoutMission}
            />
          </div>
        ))}
        <div className="MissionCard-Only">
          <CardAjoutMission
            IsAjoutMission={IsAjoutMission}
            setIsAjoutMission={setIsAjoutMission}
          />
        </div>
      </div>
    </div>
  );
};

export default GestionMissions;
