import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Navbar from "../components/Navbar";

const ListAlerte = () => {
  
    const [idNiveauAlerte, idNiveauchange] = useState(0);
    const [alerte, setAlerte] = useState([]);
    const [niveau, setNiveau] = useState([]);

    const Clear = () =>{
      fetch('http://localhost:4000/DeleteAlerteClear', { method: 'DELETE' }) 

    }
    
    const Delete = (idAlerte) => {
        //1 copie
        console.log(idAlerte);
        fetch('http://localhost:4000/DeleteAlerte/'+idAlerte, { method: 'DELETE' }) 
        alert("L'alerte a bien été supprimé"); 
    }

    const Update = (idAlerte) => {
      //1 copie
      console.log(idAlerte + "c'est la modif");
      fetch('http://localhost:3000/modifAlerte/'+idAlerte)   
    }

     function convertDate(date){
      const dater = new Date(date);
              const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
              const formattedDate = dater.toLocaleDateString('fr-FR', options);    
              return formattedDate
     }

  useEffect(() => {
        fetch('http://localhost:4000/ListAlerte')
        .then((response) => {
          return response.json()
        })
        .then((result) => {
              
            setAlerte(result.results)
            console.log(result.results);
            console.log(alerte);
         
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

if (
  localStorage.getItem("userConnected") !== null &&
  JSON.parse(localStorage.getItem("userConnected")).droitCnx ===
    "Administrateur"
){
    return (
        <div>
          <Navbar />
          <h1 class="center">Gestion des Alertes</h1>
          <TextField name="idNiveauAlerte" onChange={e => 
            idNiveauchange(e.target.value)
            }
            label="Niveau"
            select
            defaultValue={0}
            style={{width : 200, marginLeft: 60, backgroundColor: "brown"}}
            > 
            <MenuItem value={0}>Tout</MenuItem>
             {(niveau.map(unNiveau => <MenuItem value={unNiveau.idNiveau}>{unNiveau.libelleNiveau}</MenuItem>))}
          </TextField>
          <a href="/addAlerte" class="btnAddAlerte"><Button color="success" variant="contained" >Créer une alerte</Button></a>
          <a href="/gestionAlerte" onClick={Clear}><Button color="warning" variant="contained" >Nettoyer</Button></a>
          

          <div class="alertes-board">
     
          {alerte.length === 0 ? (
          
          <p align="center">Aucune alerte actuellement</p>
          ) : (
          <>
            {alerte.filter(laAlerte => laAlerte.idNiveauAlerte == idNiveauAlerte || idNiveauAlerte == 0).map((uneAlerte) => (
              <div>
              <Card sx={{ minWidth: 300 }}>
               <CardContent>
            <Typography variant="h6" component="div">
            { uneAlerte.idAlerte + " - " + uneAlerte.descriptionAlerte}
            </Typography>
            <Typography variant="" component="div">
            {"Alerteur : " + uneAlerte.nomEmploye + " " + uneAlerte.prenomEmploye} 
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="" component="div">
            {uneAlerte.libelleNiveau + " (" + uneAlerte.idNiveauAlerte + ")"}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="" component="div">
            { "Créée le " + convertDate(uneAlerte.dateAlerte) }
              </Typography>
              <Typography  color="text.secondary" variant="" component="div">
              {uneAlerte.active == 0 ? (
          
          <div align="left">En cours</div>
          ) : (
          <>
          <div align="left">Terminé</div>
          </>
          )}
            </Typography>                 
            </CardContent>         
            <CardActions>
            <Link to={`/modifAlerte/${uneAlerte.idAlerte}`}><Button onClick={() => Update(uneAlerte.idAlerte)}>Modifier</Button></Link>         
            <a href="/gestionAlerte"><Button align="left" onClick={() => Delete(uneAlerte.idAlerte)}><IconButton aria-label="delete" color="error"><DeleteIcon /></IconButton></Button></a>
            </CardActions>
          </Card>      
        </div>   
      ))}
    </>
    )}        
  </div>
</div> 
)
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

export default ListAlerte;