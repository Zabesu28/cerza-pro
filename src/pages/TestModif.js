import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Navbar from "../components/Navbar";

const ModifTest = () => {
  // state variables
  const [libelleTest, setLibelleTest] = useState('');
  const { id } = useParams();

  const handlesubmit = (e) => {
      e.preventDefault();
      const empobj = { libelleTest };

    let isValid = true;

  if (libelleTest == "") {
    isValid = false;  
    alert("La description de l'alerte est obligatoire");
  }


  if (isValid) {
    // Envoyer la requête PUT
    axios.put('http://localhost:4000/ModifTest/' + id, empobj, {
        method: 'PUT',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(empobj)
        
      })
    .then((response) => {
      console.log(response);
      alert("Le Test a été modifié avec succès");
      // Réinitialiser les champs du formulaire
      e.target.reset();
      window.location.replace('http://localhost:3000/listTest')
    })
    .catch((error) => {
      console.log(error);
      alert("Une erreur s'est produite lors de la modification du test");
    });
  }
  console.log(empobj);
  }

  if (
    localStorage.getItem("userConnected") !== null &&
    JSON.parse(localStorage.getItem("userConnected")).droitCnx ===
      "Administrateur"
  ){
  return (
    <div>
    <Navbar />
    <div class="boxAlerteModif">
    <Card sx={{ minWidth: 300 }}>
    <h2 class="center">Modifier le test</h2>
    <form method="PUT" onSubmit={handlesubmit}>
                   
    <CardContent>
             
    <TextField 
    label="Description"
    type="textarea" 
    name="libelleTest" 
    value={libelleTest} 
    onChange={e => 
      setLibelleTest(e.target.value)
    }
    >
    </TextField>

        
            </CardContent>         
            <CardActions>
                  <Button size="small" type="submit" color="success" value="Modifier">Modifier</Button>
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

export default ModifTest;