import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

    return (
        <div>
          <h1>Gestion des Alertes</h1>
          <a href="/addAlerte"><button>Add</button></a>
          <select name="idNiveauAlerte" onChange={e => 
      idNiveauchange(e.target.value)
    }> 
    <option value={0}>Tout</option>
  {(niveau.map(unNiveau => <option value={unNiveau.idNiveau}>{unNiveau.libelleNiveau}</option>))}
    </select><a href="/gestionAlerte" onClick={Clear}><button>Clear</button></a>
    
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Active</TableCell>
            <TableCell align="left">idEmploye</TableCell>
            <TableCell align="left">idAlerte</TableCell>
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
                    <TableCell align="left">{uneAlerte.idAlerte}</TableCell>
                    <TableCell align="left">{uneAlerte.descriptionAlerte}</TableCell>
                    <TableCell align="left">{uneAlerte.active}</TableCell>
                    <TableCell align="left">{uneAlerte.idEmployeAlerte}</TableCell>
                    <TableCell align="left">{uneAlerte.idNiveauAlerte}</TableCell>
                    <TableCell align="left">
                      <Link to={`/modifAlerte/${uneAlerte.idAlerte}`}><button onClick={() => Update(uneAlerte.idAlerte)}>Modifier</button></Link>
                      </TableCell>
                    <TableCell align="left"><a href="/gestionAlerte"><button onClick={() => Delete(uneAlerte.idAlerte)}>X</button></a></TableCell>
                  </TableRow>
                ))}
            </>
          )}
                
        </TableBody>
      </Table>
      
    </TableContainer>
   </div>)} 



export default ListAlerte;