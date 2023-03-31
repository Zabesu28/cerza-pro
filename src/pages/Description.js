import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Slider from "react-slick";

const Description = () => {
      let location = useLocation();

      const [data, setData] = useState([]);

      const [img, setImg] = useState([]);

      useEffect(() => {
            axios.get("http://localhost:4000/getEspeces/"+location.state).then((response) => {
                  setData(response.data);
            })
            axios.get("http://localhost:4000/getImages/"+location.state).then((response) => {
                  setImg(response.data);
            })
      }, []);

      return (
            <div>
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