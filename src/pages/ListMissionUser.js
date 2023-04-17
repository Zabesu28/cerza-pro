import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Navbar from "../components/Navbar";
const moment = require('moment');

const ListMissionUser = () => {
  
    const [mission, setMission] = useState([]);
    const [idMission, setIdMission] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [commentaire, setCommentaire] = useState(null);
    const [date, setDate] = useState(null);
    const [isChecked, setIsChecked] = useState(null);
    const [idUser, setIdUser] = useState(0);

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
  if(!JSON.parse(localStorage.getItem("userConnected"))){

  }else{
    axios
    .post("http://localhost:4000/getIdUtilByIdentifiant", {
      identifiant: JSON.parse(localStorage.getItem("userConnected")).idCnx,
    })
    .then((res) => {
      setIdUser(parseInt(res.data[0].idEmploye));
    });
  }
  
}, []);

useEffect(() => {
  if (idUser) {
    fetch("http://localhost:4000/ListMissionUser/" + idUser)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setMission(result.results);
        console.log(result.results);
        console.log(mission);
        console.log(result.results.length);
      });
  }
}, [idUser]);


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
        idEmployeAttribuer: idUser,
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
      // Réinitialiser les champs du formulaire + change par id du user connecté
      e.target.reset();
      window.location.replace('http://localhost:3000/listMissionUser')
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

if (
  localStorage.getItem("userConnected") !== null
){
    return (
      
      <div>     
        <Navbar />
          <h1 class="center">Missions du jour</h1>
          <div class="missions-user-board">
        
          {mission.length === 0 ? (
          
          <p align="center">Aucune mission n'est attribué</p>
          ) : (
          <>
            {mission.map((uneMission) => (
              <div> 

              <Card sx={{ minWidth: 300 }}>
              <form method="PUT" onSubmit={handlesubmit}>
               <CardContent>
            <Typography variant="h6" component="div">
            {uneMission.libelleMission + " - " + uneMission.codeEnclosAttribuer}
            </Typography>
            <Typography variant="" component="div">
            { "Assigné " + convertDateSansMaj(uneMission.dateJ)}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" component="div">
              {uneMission.libelleEtat} {uneMission.dateValide ? convertDateSansMaj(uneMission.dateValide) : ''}
              </Typography>
              
            <Typography variant="body2">           
              <TextField 
              type="textarea" 
              name="commentaire" 
              value={uneMission.commentaire} 
              id={uneMission.date} 
              disabled={(uneMission.commentaire == null) === false}  
              onChange={e => {
                setCommentaire(e.target.value); 
                setDate(e.target.id);}}>
              </TextField> 

              <Checkbox 
              type="checkbox" 
              disabled={uneMission.idEtatAttribuer === 2} 
              name={uneMission.date} 
              id={uneMission.idMissionAttribuer} 
              value={isChecked ? 1 : 2}
              color='success'
              onChange={e => {
                setSelectedId(e.target.value); 
                setIdMission(e.target.id); 
                setDate(e.target.name);     
                setIsChecked(e.target.checked);
                }}     
                />
              
            </Typography>       
            </CardContent>         
            <CardActions>
                  <Button size="small" type="submit" color='success' endIcon={<SendIcon />} disabled={(!isChecked && !commentaire) || !(uneMission.date == date)}>Soumettre</Button>
                </CardActions>
                </form> 
              </Card>
              </div>  
                ))}  
            </>
          )}            
   </div>
</div>)
} else {
  window.location.replace("/authAdmin");
}} 


export default ListMissionUser