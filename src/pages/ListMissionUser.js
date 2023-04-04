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
const moment = require('moment');

const ListMissionUser = () => {
  
    const [mission, setMission] = useState([]);
    const [idMission, setIdMission] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [commentaire, setCommentaire] = useState(null);
    const [date, setDate] = useState(null);
    const [isChecked, setIsChecked] = useState(null);

 function convertDate(date){
  const dater = new Date(date);
          const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
          const formattedDate = dater.toLocaleDateString('fr-FR', options);
          
          const formattedDateCapitalized = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
          
          console.log(new Date());
          return formattedDateCapitalized
 }   

 function convertDateSansMaj(date){
  const dater = new Date(date);
          const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
          const formattedDate = dater.toLocaleDateString('fr-FR', options);
          
          return formattedDate
 }   
    

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
  let dateValid
  e.preventDefault();
  if((commentaire === '' || commentaire === null) && date === null)
  {
    alert("Le commentaire est vide")
  }
  else{
    dateValid = moment(Date()).format('YYYY-MM-DD HH:mm:ss');
    console.log(dateValid);
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
        dateAttribuer: date,
        dateValidation: dateValid
        
      }
    })
    .then((response) => {
      console.log(response.data);
      if(!(response.data.idEtatAttribuer === null)){
        alert("La mission a bien été fini");
      }
      if(response.data.commentaire){
      alert("Le commentaire a bien été ajouté");
      }
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

    return (
      
      <div>
        
          <h1 class="center">Missions</h1>
          <div class="missions-user-board">
        
            {mission.map((uneMission) => (
              
              
                
                
              <Card sx={{ minWidth: 300 }}>
              <form method="PUT" onSubmit={handlesubmit}>
               <CardContent>
            <Typography variant="h6" component="div">
            {uneMission.libelleMission}
            </Typography>
            <Typography variant="" component="div">
            {convertDate(uneMission.dateJ)}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {uneMission.libelleEtat} {uneMission.dateValide ? convertDateSansMaj(uneMission.dateValide) : ''}
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
                setIsChecked(e.target.checked);
                }}
                
                >
              </input>
            </Typography>       
            </CardContent>         
            <CardActions>
                  <Button size="small" type="submit" disabled={!isChecked && uneMission.commentaire}>Soumettre</Button>
                </CardActions>
                </form> 
              </Card>  
                ))}  
                        
   </div>
   </div>)} 

export default ListMissionUser