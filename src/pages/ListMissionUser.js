import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
  url: 'http://localhost:4000/ModifMissionCheckbox',
  headers: {
    'content-Type': 'application/json'
  },
  data: {
    idEtatAttribuer: selectedId,
    idMissionAttribuer: idMission,
    idEmployeAttribuer: 2
    
  }
})
.then((response) => {
  console.log(response);
  alert("La mission a bien été fini");
  // Réinitialiser les champs du formulaire
  e.target.reset();
  // window.location.replace('http://localhost:3000/listMissionUser/'+2)
})
.catch((error) => {
  console.log(error);
  alert("Une erreur s'est produite lors de la validation de la mission");
});

console.log(selectedId);
console.log(idMission);
}

const handleCheckboxChange = (event) => {
  setSelectedId(event.target.value);
  setIdMission(event.target.id);
  setCheckboxChecked(event.target.checked);
}
    return (
        <div>
          <h1>Missions du jour</h1>
          
        
            {mission.map((uneMission) => (
              <div class="game-board">
              <Card sx={{ minWidth: 275 }}>
              
               <CardContent>
            <Typography variant="h5" component="div">
            {uneMission.libelleMission}
            </Typography>
            <Typography variant="h5" component="div">
            {uneMission.date}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {uneMission.libelleEtat}
              </Typography>
            <Typography variant="body2">
              commentaire
            </Typography>
            <form method="PUT" onSubmit={handlesubmit}>
                      <input type="checkbox" disabled={uneMission.idEtatAttribuer === 2} name="active" id={uneMission.idMissionAttribuer} value={2} onChange={e => {setSelectedId(e.target.value); setIdMission(e.target.id); handleCheckboxChange(e)}}>
                      </input>
                      <input type="submit" disabled={!checkboxChecked || uneMission.idEtatAttribuer === 2}></input>
                      
                      </form> 
            

            </CardContent>
            <CardActions>
                  <Button size="small">Soumettre</Button>
                </CardActions>
              </Card> 

              
              </div>
                ))}          
   </div>)} 

export default ListMissionUser