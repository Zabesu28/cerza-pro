import React, { useState, useEffect } from "react";
import "../styles/GestionMissions.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import CardMission from "../components/CardMission";

const GestionMissions = () => {
  const [lesMissions, setLesMission] = useState([]);
  const [IdModifMission, setIdModifMission] = useState("");
  const [IdSupprMission, setIdSupprMission] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/missions").then((res) => {
      setLesMission(res.data);
    });
  }, []);

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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionMissions;
