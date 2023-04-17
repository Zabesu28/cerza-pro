import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Questionnaire from '../components/Questionnaire';
import Navbar from '../components/Navbar';
import LastQuestionnaire from '../components/LastQuestionnaire';
import { Refresh } from '@mui/icons-material';

const QuestionnaireSante = () => {

      const [especes, setEspeces] = useState([]);

      const [animaux, setAnimaux] = useState([]);

      const [infoAnimal, setAnimal] = useState([]);

      useEffect(() => {
            axios.get("http://localhost:4000/getEspecesLibelle").then((response) => {
                  setEspeces(response.data);
            })
            axios.get("http://localhost:4000/getAnimaux/1").then((response) => {
                  setAnimaux(response.data);
            });
            axios.get("http://localhost:4000/getAnimal/1").then((response) => {
                  setAnimal(response.data);
            })
      }, []);

      const handleChangeEspece = (event) => {
            event.preventDefault();
            axios.get("http://localhost:4000/getAnimaux/"+event.target.value).then((response) => {
                  setAnimaux(response.data);
            });
      }

      const handleChangeAnimal = (event) => {
            event.preventDefault();
            axios.get("http://localhost:4000/getAnimal/"+event.target.value).then((response) => {
                  setAnimal(response.data);
            })
      }

      function convertirDate(date){
            const dater = new Date(date);
            const options = { year: 'numeric', day: 'numeric', month: 'long' };
            const formattedDate = dater.toLocaleDateString('fr-FR', options);
                    
            const LaDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
                    
            return LaDate
      }

      return (
            <div>
                  <Navbar></Navbar>
                  <TextField
                        id="cbEspeces"
                        className='cb'
                        select
                        label="Espèce de l'animal"
                        defaultValue={1}
                        onChange={handleChangeEspece}
                  >
                        {especes.map((uneEspece) => (
                        <MenuItem key={uneEspece.idEspece} value={uneEspece.idEspece}>
                              {uneEspece.libelleEspece}
                        </MenuItem>
                        ))}
                  </TextField>
                  <TextField
                        id="cbAnimaux"
                        className='cb'
                        select
                        label="Animal"
                        defaultValue={1}
                        onChange={handleChangeAnimal}
                  >
                        {animaux.map((unAnimal) => (
                        <MenuItem key={unAnimal.idAnimal} value={unAnimal.idAnimal}>
                              {unAnimal.nomAnimal}
                        </MenuItem>
                        ))}
                  </TextField>
                  {infoAnimal.map((unAnimal) => (
                        <div key={unAnimal.idEspece}>
                              <div className='infoAnimal'>
                                    <p>NOM : {unAnimal.nomAnimal}</p>
                                    <p>DATE DE NAISSANCE : {convertirDate(unAnimal.dateNaissAnimal)}</p>
                                    <p>SEXE : {unAnimal.sexeAnimal === 0 ? <label>Femelle</label> : <label>Mâle</label>}</p>
                                    <p>ENCLOS : {unAnimal.codeEnclosAnimal}</p>
                              </div>
                              <div class="questionnaires">
                                    <LastQuestionnaire key={"A"+unAnimal.idAnimal} idAnimal={unAnimal.idAnimal}></LastQuestionnaire>
                                    <Questionnaire key={"B"+unAnimal.idAnimal} idAnimal={unAnimal.idAnimal}></Questionnaire>
                              </div>
                              
                        </div>
                  ))}
            </div>
      );
};

export default QuestionnaireSante;