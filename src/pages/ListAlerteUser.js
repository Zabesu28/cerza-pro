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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';


const ListAlerteUser = () => {
  
    const [idNiveauAlerte, idNiveauchange] = useState(0);
    const [alerte, setAlerte] = useState([]);
    const [niveau, setNiveau] = useState([]);
    const [active, setActive] = useState(Boolean);
    const [selectedId, setSelectedId] = useState(null);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    

  useEffect(() => {
        fetch('http://localhost:4000/ListAlerteUser')
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          setTimeout(() => {   
            setActive(result.results.active)  
            setAlerte(result.results)
            console.log(result.results);
            console.log(alerte);
          }) 
          console.log(result.results.length);
        })

        fetch('http://localhost:4000/ListNiveau')
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          setTimeout(() => {     
            setNiveau(result.results)
            console.log(result.results);
            console.log(niveau);
          }, 1500) 
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
  url: 'http://localhost:4000/ModifAlerteCheckbox/' + selectedId,
  headers: {
    'content-Type': 'application/json'
  },
  data: {
    active: active
  }
})
.then((response) => {
  console.log(response);
  alert("L'alerte a bien été règlé");
  // Réinitialiser les champs du formulaire
  e.target.reset();
  window.location.replace('http://localhost:3000/listAlerte')
})
.catch((error) => {
  console.log(error);
  alert("Une erreur s'est produite lors de la validation de l'alerte");
});

console.log(selectedId);
console.log(active);
}

const handleCheckboxChange = (event) => {
  setSelectedId(event.target.id);
  setActive(event.target.value);
  setCheckboxChecked(event.target.checked);
}
    return (
        <div>
          <h1>Gestion des Alertes</h1>
          
          <select name="idNiveauAlerte" onChange={e => 
      idNiveauchange(e.target.value)
    }> 
    <option value={0}>Tout</option>
  {(niveau.map(unNiveau => <option value={unNiveau.idNiveau}>{unNiveau.libelleNiveau}</option>))}
    </select>
    <div class="missions-user-board">
     
          {alerte.length === 0 ? (
          
          <p align="left">Chargement...</p>
        ) : (
          <>
            {alerte.filter(laAlerte => laAlerte.idNiveauAlerte == idNiveauAlerte || idNiveauAlerte == 0).map((uneAlerte) => (
              <div>
              <Card sx={{ minWidth: 300 }}>
              <form method="PUT" onSubmit={handlesubmit}>
               <CardContent>
            <Typography variant="h6" component="div">
            {uneAlerte.descriptionAlerte}
            </Typography>
            <Typography variant="" component="div">
            {uneAlerte.nomEmploye} {uneAlerte.prenomEmploye}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {uneAlerte.libelleNiveau + " (" + uneAlerte.idNiveauAlerte + ")"}
              </Typography>
              
            <Typography variant="body2">
                  <input type="checkbox" 
                  disabled={uneAlerte.active === 1} 
                  name="active" 
                  id={uneAlerte.idAlerte} 
                  value={1} 
                  onChange={e => {
                    setSelectedId(e.target.id); 
                    setActive(e.target.value); 
                    handleCheckboxChange(e)
                    }}>
              </input>
            </Typography>       
            </CardContent>         
            <CardActions>
                  <Button size="small" type="submit" disabled={(!checkboxChecked || uneAlerte.active === 1 ) || !(uneAlerte.idAlerte == selectedId)}>Soumettre</Button>
                </CardActions>
                </form> 
              </Card>
                  
                  </div>   ))}
                  <a href="/addAlerteUser" class="btnAlertAdd"><Button variant="contained" >Créer une alerte</Button></a>
            </>
          )}
   </div>
   </div>)} 

export default ListAlerteUser