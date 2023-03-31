import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const ListMissionUser = () => {
  
    const [mission, setMission] = useState([]);
    const [idMission, setIdMission] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    

  useEffect(() => {
        // mettre l'id de l'utilisateur connecté
        fetch('http://localhost:4000/ListMissionUser/'+2)
        .then((response) => {
          return response.json()
        })
        .then((result) => {   
            setMission(result.results)
            console.log(result.results);
            console.log(mission);
          console.log(result.results.length);
        })
      }

  , 
[]
);
const handlesubmit = (e) => {
  e.preventDefault();


// Envoyer la requête PUT
axios({
  method: 'PUT',
  url: 'http://localhost:4000/ModifMissionCheckbox/'+2+'/'+idMission,
  headers: {
    'content-Type': 'application/json'
  },
  data: {
    idEtatAttribuer: selectedId
    
  }
})
.then((response) => {
  console.log(response);
  alert("La mission a bien été fini");
  // Réinitialiser les champs du formulaire
  e.target.reset();
  window.location.replace('http://localhost:3000/listMissionUser/'+2)
})
.catch((error) => {
  console.log(error);
  alert("Une erreur s'est produite lors de la validation de la mission");
});

console.log(selectedId);
}

const handleCheckboxChange = (event) => {
  setSelectedId(event.target.value);
  setIdMission(event.target.id);
  setCheckboxChecked(event.target.checked);
}
    return (
        <div>
          <h1>Missions du jour</h1>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Objectif</TableCell>
            <TableCell align="left">Date attribution</TableCell>
            <TableCell align="left">Valider</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mission.length === 0 ? (
          
          <TableCell align="left">Chargement...</TableCell>
        ) : (
          <>
            {mission.map((uneMission) => (
                  <TableRow
                  >
                    <TableCell align="left">{uneMission.libelleMission}</TableCell>
                    <TableCell align="left">{uneMission.date}</TableCell>
                    <TableCell align="left">
                      <form method="PUT" onSubmit={handlesubmit}>
                        <input type="checkbox" disabled={uneMission.idEtatAttribuer === 2} name="active" id={uneMission.idMissionAttribuer} value={2} onChange={e => {setSelectedId(e.target.id); setIdMission(e.target.value); handleCheckboxChange(e)}}>
                        </input>
                        <input type="submit" disabled={!checkboxChecked || uneMission.idEtatAttribuer === 2}></input>
                        
                        </form> </TableCell>
                  </TableRow>
                ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
   </div>)} 

export default ListMissionUser