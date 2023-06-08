import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import Navbar from "../components/Navbar";

const AddTest = () => {
  
  const [test, setTest] = useState([]);
  const [idUser, setIdUser] = useState(0);

      

  const handlesubmit = (e) => {
    e.preventDefault();
    const libelleTest = e.target.elements.libelleTest.value
    let isValid = true;

  if (libelleTest == "") {
    isValid = false;
    alert("Le libelle de l'alerte est obligatoire");
  }


  if (isValid) {
    // Envoyer la requête POST
    axios.post('http://localhost:4000/AddTest/', {
      libelleTest: libelleTest,
    })   
      alert("Le Test a été ajoutée avec succès");
      // Réinitialiser les champs du formulaire
      e.target.reset();
      window.location.replace('http://localhost:3000/listTest')
  }

}
      

  if (
    localStorage.getItem("userConnected") !== null &&
    JSON.parse(localStorage.getItem("userConnected")).droitCnx ===
      "Administrateur"
  ){
  return (
    <div>
    <Navbar />
    <div class="boxAlerteAdd">
    <Card sx={{ minWidth: 300 }}>
    <h2 class="center">Créer un test</h2>
    <form method="POST" onSubmit={handlesubmit}>
                   
    <CardContent>
             
    <TextField type="textarea" 
    name="libelleTest"
    label="Libelle"
    >
    </TextField>
        
            </CardContent>         
            <CardActions>
                  <Button endIcon={<SendIcon />} color='success' size="small" type="submit" value="Ajouter">Soumettre</Button>
                  <Button size="small"><Link to="/listTest">Retour</Link></Button>
                </CardActions>
                </form>
                </Card>
                </div>
                </div>
  ); 
} else {
  if (
    localStorage.getItem("userConnected") !== null &&
    JSON.parse(localStorage.getItem("userConnected")).droitCnx !==
      "Administrateur"
  ) {
    window.location.replace("/home");
  } else {
    window.location.replace("/authAdmin");
  }

}
}

export default AddTest;