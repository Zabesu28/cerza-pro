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
    const [commentaire, setCommentaire] = useState(null);
    const [date, setDate] = useState(null);
    const [isChecked, setIsChecked] = useState(null);
    

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
  console.log(date)
  if((commentaire === '' || commentaire === null) && date === null)
  {
    alert("Le commentaire est vide")
  }
  else{
    axios({
      method: 'PUT',
      url: 'http://localhost:4000/ModifMissionCheckbox',
      headers: {
        'content-Type': 'application/json'
      },
      data: {
        idEtatAttribuer: selectedId,
        idMissionAttribuer: idMission,
        idEmployeAttribuer: 2,
        commentaire: commentaire,
        dateAttribuer: date
        
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
  }

// Envoyer la requête PUT


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
          <h1 class="center">Missions du jour</h1>
          
        
            {mission.map((uneMission) => (
              <div class="game-board">
                
              <Card sx={{ minWidth: 275 }}>
              <form method="PUT" onSubmit={handlesubmit}>
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
              <input 
              type="textarea" 
              name="commentaire" 
              value={uneMission.commentaire} 
              id={uneMission.date} 
              disabled={(uneMission.commentaire == null) === false}  
              onChange={e => {
                setCommentaire(e.target.value); 
                setDate(e.target.id);}}>
                  </input> 

              <input 
              type="checkbox" 
              disabled={uneMission.idEtatAttribuer === 2} 
              name={uneMission.date} 
              id={uneMission.idMissionAttribuer} 
              value={isChecked ? 1 : 2}
              onChange={e => {
                setSelectedId(e.target.value); 
                setIdMission(e.target.id); 
                setDate(e.target.name); 
                handleCheckboxChange(e)
                setIsChecked(e.target.checked);
                }}
                checked={isChecked}
                >
              </input>
            </Typography>       
            </CardContent>         
            <CardActions>
                  <Button size="small" type="submit" disabled={!isChecked && uneMission.commentaire}>Soumettre</Button>
                </CardActions>
                </form> 
              </Card>          
              </div>
                ))}          
   </div>)} 

export default ListMissionUser