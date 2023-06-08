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

const ListTest = () => {
  
    const [idTest, setIdTest] = useState(0);
    const [test, setTest] = useState([]);
  
    const Delete = (idTest) => {
        //1 copie
        console.log(idTest);
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce test ?");
        if (confirmation) {
        fetch('http://localhost:4000/DeleteTest/'+idTest, { method: 'DELETE' }) 
        alert("Le test a bien été supprimé");
        } 
    }

    const Update = (idTest) => {
      //1 copie
      console.log(idTest + "c'est la modif");
      fetch('http://localhost:3000/modifTest/'+idTest)   
    }

     function convertDate(date){
      const dater = new Date(date);
              const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
              const formattedDate = dater.toLocaleDateString('fr-FR', options);    
              return formattedDate
     }

  useEffect(() => {
        fetch('http://localhost:4000/ListTest')
        .then((response) => {
          return response.json()
        })
        .then((result) => {
              
            setTest(result.results)
            console.log(result.results);
            console.log(test);
         
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
          <h1 class="center">Gestion des Tests</h1>
          <a href="/addTest" class="btnAddAlerte"><Button color="success" variant="contained" >Créer un test</Button></a>
          
          <div class="alertes-board">
     
          {test.length === 0 ? (
          
          <p align="center">Aucun test actuellement</p>
          ) : (
          <>
            {test.filter(leTest => leTest.idTest == idTest || idTest == 0).map((unTest) => (
              <div>
              <Card sx={{ minWidth: 300 }}>
               <CardContent>
            <Typography variant="h6" component="div">
            {"Id : " + unTest.idTest}
            </Typography>
            <Typography variant="" component="div">
            {"libelle : " + unTest.libelleTest} 
            </Typography>      
            </CardContent>         
            <CardActions>
            <Link to={`/modifTest/${unTest.idTest}`}><Button onClick={() => Update(unTest.idTest)}>Modifier</Button></Link>         
            <a href="/listTest"><Button align="left" onClick={() => Delete(unTest.idTest)}><IconButton aria-label="delete" color="error"><DeleteIcon /></IconButton></Button></a>
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

export default ListTest;