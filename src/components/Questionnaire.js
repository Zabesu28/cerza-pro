import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Questionnaire = ({idAnimal}) => {

      const [animal, setAnimal] = useState([]);

      useEffect(() => {
            axios.get("http://localhost:4000/getAnimal/"+idAnimal).then((response) => {
                  setAnimal(response.data);
            })
      }, []);

      return (
            <div>
                  {console.log(idAnimal)}
                  {animal.map((unAnimal) => (
                        <div key={unAnimal.idEspece}>
                              <p>NOM : {unAnimal.nomAnimal}</p>
                              <p>DATE DE NAISSANCE : {unAnimal.dateNaissAnimal.substring(0,10)}</p>
                              <p>SEXE : {unAnimal.sexeAnimal == 0 ? <label>Femelle</label> : <label>Mâle</label>}</p>
                              <p>ENCLOS : {unAnimal.codeEnclosAnimal}</p>
                        </div>
                  ))}
            </div>
      );
};

export default Questionnaire;