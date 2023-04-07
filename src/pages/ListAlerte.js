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
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';

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
          <a href="/addAlerte"><Button variant="contained" >Créer une alerte</Button></a>
          <TextField name="idNiveauAlerte" onChange={e => 
            idNiveauchange(e.target.value)
            }

            select
            defaultValue={0}
            style={{width : 200, paddingLeft: 60}}
            > 
            <MenuItem value={0}>Tout</MenuItem>
             {(niveau.map(unNiveau => <MenuItem value={unNiveau.idNiveau}>{unNiveau.libelleNiveau}</MenuItem>))}
          </TextField>
          <a href="/gestionAlerte" onClick={Clear}><Button variant="contained" >Clear</Button></a>

          <div class="alertes-board">
     
          {alerte.length === 0 ? (
          
          <p align="left">Chargement...</p>
          ) : (
          <>
            {alerte.filter(laAlerte => laAlerte.idNiveauAlerte == idNiveauAlerte || idNiveauAlerte == 0).map((uneAlerte) => (
              <div>
              <Card sx={{ minWidth: 300 }}>
               <CardContent>
            <Typography variant="h6" component="div">
            {uneAlerte.descriptionAlerte}
            </Typography>
            <Typography variant="" component="div">
            {"Alerteur : " + uneAlerte.nomEmploye + " " + uneAlerte.prenomEmploye} 
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {uneAlerte.libelleNiveau + " (" + uneAlerte.idNiveauAlerte + ")"}
              </Typography>
              <Typography  color="text.secondary">
              {uneAlerte.active == 0 ? (
          
          <p align="left">En cours</p>
          ) : (
          <>
          <p align="left">Terminé</p>
          </>
          )}
              </Typography>
                    
            </CardContent>         
            <CardActions>
    
                </CardActions>
              </Card>
                  
                  </div>   ))}
            </>
          )}
          </div>
          </div> )}
            
            {/* <TableContainer component={Paper}>
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
   </div>)}  */}



export default ListAlerte;