import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Espece from '../components/Espece';
import '../styles/encyclopedie.css'
import { NavLink } from 'react-router-dom';

const Encyclopedie = () => {

      const [data, setData] = useState([]);

      useEffect(() => {
            axios.get("http://localhost:4000/getEspeces").then((response) => {
                  setData(response.data);
            })
      }, []);

      return (
            <div>
                 <h1>Encyclopédie des especes</h1>
                 <div className="gridEspece">
                        {data.map((uneEspece) => (
                              <NavLink key={uneEspece.idEspece} to={uneEspece.libelleEspece} state={uneEspece.idEspece}>
                                    <Espece key={uneEspece.idEspece} espece={uneEspece}></Espece>
                              </NavLink>
                        ))}
                 </div>
                 
            </div>
      );
};

export default Encyclopedie;