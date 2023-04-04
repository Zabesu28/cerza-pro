import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Description = () => {
      let location = useLocation();

      const [data, setData] = useState([]);

      useEffect(() => {
            axios.get("http://localhost:4000/getEspeces/"+location.state).then((response) => {
                  setData(response.data);
            })
      }, []);

      return (
            <div>
                  <Navbar></Navbar>
                  {data.map((espece) => (
                        <div key={espece.idEspece}>
                              <h1>{espece.libelleEspece}</h1>
                              <p>{espece.description}</p>
                              <p>Régime alimentaire : {espece.regime}</p>
                              <p>Poids : entre {espece.poidsMin} et {espece.poidsMax} kg</p>
                        </div>
                  ))}
            </div>
      );
};

export default Description;