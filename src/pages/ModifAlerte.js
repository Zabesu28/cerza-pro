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

const ModifAlerte = () => {
  // state variables
  const [descriptionAlerte, descriptionAlertechange] = useState('');
  const [idEmployeAlerte, idEmployechange] = useState(0);
  const [idNiveauAlerte, idNiveauchange] = useState(0);
  const [libelleNiveau, libelleNiveauchange] = useState('');
  const { id } = useParams();
  const [employes, setEmployes] = useState([]);
  const [niveau, setNiveau] = useState([]);

    useEffect(() => {
     fetch('http://localhost:4000/ListAlerte/' + id).then((res) => {
          return res.json();
      }).then((res) => {
          console.log(res.results);
          descriptionAlertechange(res.results[0].descriptionAlerte);
          idEmployechange(res.results[0].idEmployeAlerte);
          idNiveauchange(res.results[0].idNiveauAlerte);
          libelleNiveauchange(res.results[0].libelleNiveau);
      }).catch((err) => {
          console.log(err.message);
      })

      fetch('http://localhost:4000/ListEmployesCBModif/'+idEmployeAlerte)
        .then((response) => {
          return response.json()
        })
        .then((result) => {    
            setEmployes(result.results)
            console.log(employes); 
          console.log(result.results);
          console.log(result.results.length);
        })

        fetch('http://localhost:4000/ListNiveauCBModif/'+idNiveauAlerte)
        .then((response) => {
          return response.json()
        })
        .then((result) => {   
            setNiveau(result.results)
            console.log(niveau);
          console.log(result.results);
          console.log(result.results.length);
        })
      }, 
    []
    );
    

  const handlesubmit = (e) => {
      e.preventDefault();
      const empobj = { descriptionAlerte, idEmployeAlerte: 1, idNiveauAlerte };

    let isValid = true;

  if (descriptionAlerte == "") {
    isValid = false;  
    alert("La description de l'alerte est obligatoire");
  }

  if (idNiveauAlerte == "0") {
    isValid = false;
    alert("Vous devez sélectionner un niveau");
  }

  if (isValid) {
    // Envoyer la requête PUT
    axios.put('http://localhost:4000/ModifAlerte/' + id, empobj, {
        method: 'PUT',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(empobj)
        
      })
    .then((response) => {
      console.log(response);
      alert("L'alerte a été modifié avec succès");
      // Réinitialiser les champs du formulaire
      e.target.reset();
      window.location.replace('http://localhost:3000/gestionAlerte')
    })
    .catch((error) => {
      console.log(error);
      alert("Une erreur s'est produite lors de la modification de l'alerte");
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
    <h2 class="center">Modifier l'alerte</h2>
    <form method="PUT" onSubmit={handlesubmit}>
                   
    <CardContent>
             
    <TextField 
    label="Description"
    type="textarea" 
    name="descriptionAlerte" 
    value={descriptionAlerte} 
    onChange={e => 
      descriptionAlertechange(e.target.value)
    }
    
    >
    </TextField>
 
    <TextField 
      onChange={e => {
        idNiveauchange(e.target.value);
        libelleNiveauchange(e.target.name);
        }}
        label="Niveau"
        select
        defaultValue={idNiveauAlerte}
        name={libelleNiveau}
        style={{width : 200, marginTop :40}}
        > 
        <MenuItem value={idNiveauAlerte}>{libelleNiveau +" (valeur de base)"}</MenuItem>
             {(niveau.map(unNiveau => <MenuItem value={unNiveau.idNiveau}>{unNiveau.libelleNiveau}</MenuItem>))}
          </TextField>
 
        
            </CardContent>         
            <CardActions>
                  <Button size="small" type="submit" color="success" value="Modifier">Modifier</Button>
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

export default ModifAlerte;