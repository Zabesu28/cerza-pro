import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Espece from '../components/Espece';
import '../styles/encyclopedie.css'
import {NavLink} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar';

const Encyclopedie = () => {

      const [data, setData] = useState([]);

      const [dataFilter, setDataFilter] = useState([]);

      useEffect(() => {
            axios.get("http://localhost:4000/getEspeces").then((response) => {
                  setData(response.data);
                  setDataFilter(response.data);
            })
      }, []);

      const handleChange = (event) => {
            event.preventDefault();
            setDataFilter(data.filter(uneData => uneData.libelleEspece.toLowerCase().includes(event.target.value) || uneData.libelleEspece.toUpperCase().includes(event.target.value)));
      };
      

      return (
            <div>
                  <Navbar></Navbar>
                  <h1 className='center'>Les espèces présentes dans le zoo</h1>
                  <TextField id="outlined-basic" className='searchBar' label="Rechercher" variant="outlined" onChange={handleChange}/>
                  <div className="gridEspece">
                        {dataFilter.map((uneEspece) => (
                              <NavLink className="noDeco" key={uneEspece.idEspece} to={uneEspece.libelleEspece} state={uneEspece.idEspece}>
                                    <Espece key={uneEspece.idEspece} espece={uneEspece}></Espece>
                              </NavLink>
                        ))}
                 </div>
            </div>
      );
};

export default Encyclopedie;