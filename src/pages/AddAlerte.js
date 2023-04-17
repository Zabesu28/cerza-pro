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

const AddAlerte = () => {
  
  const [employe, setEmploye] = useState([]);
  const [niveau, setNiveau] = useState([]);
  const [idUser, setIdUser] = useState(0);

      

  const handlesubmit = (e) => {
    e.preventDefault();
    const descriptionAlerte = e.target.elements.descriptionAlerte.value
    const idNiveau = e.target.elements.idNiveau.value
    let isValid = true;

    axios.post("http://localhost:4000/getIdUtilByIdentifiant", {
            identifiant: JSON.parse(localStorage.getItem("userConnected")).idCnx,
          })
          .then((res) => {
            setIdUser(parseInt(res.data[0].idEmploye))
          })

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
      idEmploye: idUser, 
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
        console.log(localStorage.getItem("userConnected"))
      console.log(result.results.length);
    })

    axios.post("http://localhost:4000/getIdUtilByIdentifiant", {
            identifiant: JSON.parse(localStorage.getItem("userConnected")).idCnx,
          })
          .then((res) => {
            setIdUser(parseInt(res.data[0].idEmploye))
          })
  }, 
  []
  );

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
                  <Button endIcon={<SendIcon />} color='success' size="small" type="submit" value="Ajouter">Soumettre</Button>
                  <Button size="small"><Link to="/gestionAlerte">Retour</Link></Button>
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

export default AddAlerte;