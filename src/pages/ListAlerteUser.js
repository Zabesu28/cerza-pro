import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

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
          <a href="/addAlerteUser"><button>Créer une alerte</button></a>
          <select name="idNiveauAlerte" onChange={e => 
      idNiveauchange(e.target.value)
    }> 
    <option value={0}>Tout</option>
  {(niveau.map(unNiveau => <option value={unNiveau.idNiveau}>{unNiveau.libelleNiveau}</option>))}
    </select>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Alerteur</TableCell>
            <TableCell align="left">Niveau Alerte</TableCell>
            <TableCell align="left">Valider</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerte.length === 0 ? (
          
          <TableCell align="left">Chargement...</TableCell>
        ) : (
          <>
            {alerte.filter(laAlerte => laAlerte.idNiveauAlerte == idNiveauAlerte || idNiveauAlerte == 0).map((uneAlerte) => (
                  <TableRow
                    key={uneAlerte.idAlerte}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{uneAlerte.descriptionAlerte}</TableCell>
                    <TableCell align="left">{uneAlerte.nomEmploye} {uneAlerte.prenomEmploye}</TableCell>
                    <TableCell align="left">{uneAlerte.libelleNiveau + " (" + uneAlerte.idNiveauAlerte + ")"}</TableCell>
                    <TableCell align="left">
                      <form method="PUT" onSubmit={handlesubmit}>
                        <input type="checkbox" disabled={uneAlerte.active === 1} name="active" id={uneAlerte.idAlerte} value={1} onChange={e => {setSelectedId(e.target.id); setActive(e.target.value); handleCheckboxChange(e)}}>
                        </input>
                        <input type="submit" disabled={!checkboxChecked || uneAlerte.active === 1}></input>
                        
                        </form> </TableCell>
                  </TableRow>
                ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
   </div>)} 

export default ListAlerteUser