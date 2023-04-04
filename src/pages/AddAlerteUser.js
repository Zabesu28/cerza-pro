import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AddAlerteUser = () => {
  
  const [niveau, setNiveau] = useState([]);
      

  const handlesubmit = (e) => {
    e.preventDefault();
    const descriptionAlerte = e.target.elements.descriptionAlerte.value
    const idNiveau = e.target.elements.idNiveau.value
    // mettre l'id du user connecté à la place de 1
    const idEmploye = 1; 
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
      idEmploye,
      idNiveau
    })   
      alert("L'alerte a été ajoutée avec succès");
      // Réinitialiser les champs du formulaire
      e.target.reset();
      window.location.replace('http://localhost:3000/ListAlerte')
  }

}
      
      useEffect(() => {

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
    <div class="boxAlerteUserAdd">
    <Card sx={{ minWidth: 300 }}>
     <form method="POST" onSubmit={handlesubmit}>
      
              
               <CardContent>
               <label>
    Description
    <input type="textarea" name="descriptionAlerte" />
  </label>

  <label>
    Niveau:
    <select name="idNiveau">
  {niveau.length === 0 ? (
    <option value="0">Chargement...</option>
  ) : (
    <>
      <option value="0">Sélectionner une valeur</option>
      {(niveau.map(unNiveau => <option value={unNiveau.idNiveau}>{unNiveau.libelleNiveau}</option>))}
    </>
  )}
</select>
 
  </label>         
            </CardContent>         
            <CardActions>
                  <Button size="small" type="submit" value="Ajouter">Soumettre</Button>
                  <Button size="small"><Link to="/ListAlerte">Retour</Link></Button>
                </CardActions>
                </form>
                </Card>
                </div>
      
 


  ); 
}


export default AddAlerteUser;