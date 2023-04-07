import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';

const AddAlerte = () => {
  
  const [employe, setEmploye] = useState([]);
  const [niveau, setNiveau] = useState([]);
      

  const handlesubmit = (e) => {
    e.preventDefault();
    const descriptionAlerte = e.target.elements.descriptionAlerte.value
    const idNiveau = e.target.elements.idNiveau.value
    let isValid = true;

  if (descriptionAlerte == "") {
    isValid = false;
    alert("La description de l'alerte est obligatoire");
  }

  if (idNiveau == "0") {
    isValid = false;
    alert("Vous devez sélectionner un niveau");
  }

  if (isValid) {
    // Envoyer la requête POST
    axios.post('http://localhost:4000/AddAlerte/', {
      descriptionAlerte,
      idEmploye: 1, // changer par l'id de l'admin co
      idNiveau
    })   
      alert("L'alerte a été ajoutée avec succès");
      // Réinitialiser les champs du formulaire
      e.target.reset();
      window.location.replace('http://localhost:3000/gestionAlerte')
  }

}
      
      useEffect(() => {
        fetch('http://localhost:4000/ListEmployesCB')
        .then((response) => {
          return response.json()
        })
        .then((result) => {    
            setEmploye(result.results)
            console.log(employe);
      
          console.log(result.results.length);
        })

        fetch('http://localhost:4000/ListNiveau')
    .then((response) => {
      return response.json()
    })
    .then((result) => {
        setNiveau(result.results)
        console.log(niveau);
      console.log(result.results.length);
    })
  }, 
  []
  );

  return (

    <div class="boxAlerteAdd">
    <Card sx={{ minWidth: 300 }}>
    <h2 class="center">Créer une alerte</h2>
    <form method="POST" onSubmit={handlesubmit}>
                   
    <CardContent>
             
    <TextField type="textarea" 
    name="descriptionAlerte"
    label="Description"
    >
    </TextField>
 
    <TextField name="idNiveau" 
            label="Niveau"
            select
            defaultValue={0}
            style={{width : 200, marginTop :40}}
            > 
             {(niveau.map(unNiveau => <MenuItem value={unNiveau.idNiveau}>{unNiveau.libelleNiveau}</MenuItem>))}
          </TextField>
 
        
            </CardContent>         
            <CardActions>
                  <Button endIcon={<SendIcon />} size="small" type="submit" value="Ajouter">Soumettre</Button>
                  <Button size="small"><Link to="/gestionAlerte">Retour</Link></Button>
                </CardActions>
                </form>
                </Card>
                </div>
      
  ); 
}

export default AddAlerte;