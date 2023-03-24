import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'descriptionAlerte', headerName: 'Description Alerte', width: 130 },
//     { field: 'active', headerName: 'Active', width: 130 },
//     { field: 'idEmployeAlerte', headerName: 'ID Employe', width: 130 },
//     { field: 'idNiveauAlerte', headerName: 'ID Niveau', width: 130 }
//   ];

class ListAlerte extends Component {
    state = {
        post: []
      }
      Delete = (idAlerte) => {
        //1 copie
        console.log(idAlerte);
        fetch('http://localhost:4000/DeleteAlerte/'+idAlerte, { method: 'DELETE' })  
    }
    Update = (idAlerte) => {
      //1 copie
      console.log(idAlerte + "c'est la modif");
      fetch('http://localhost:3000/modifAlerte/'+idAlerte)
      
  }

    componentDidMount(){
        fetch('http://localhost:4000/ListAlerte')
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          setTimeout(() => {     
            this.setState({post: result.results})
            console.log(result.results);
            console.log(this.state.post);
          }, 1500) 
          console.log(result.results.length);
        })
      }

    render() {
    return (
        <div>
          <h1>Gestion des Alertes</h1>
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
          {this.state.post.map((uneAlerte) => (
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
                <Link to={`/modifAlerte/${uneAlerte.idAlerte}`}><button onClick={() => this.Update(uneAlerte.idAlerte)}>Modifier</button></Link>
                </TableCell>
              <TableCell align="left"><a href="/gestionAlerte"><button onClick={() => this.Delete(uneAlerte.idAlerte)}>X</button></a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <a href="/addAlerte"><button>Add</button></a>
    </TableContainer>
   </div>)} 
};


export default ListAlerte;