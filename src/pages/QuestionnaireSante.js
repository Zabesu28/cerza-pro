import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Questionnaire from '../components/Questionnaire';

const QuestionnaireSante = () => {

      const [especes, setEspeces] = useState([]);

      const [animaux, setAnimaux] = useState([]);

      const [quest, setQuest] = useState(1);

      useEffect(() => {
            axios.get("http://localhost:4000/getEspecesLibelle").then((response) => {
                  setEspeces(response.data);
            })
            axios.get("http://localhost:4000/getAnimaux/1").then((response) => {
                  setAnimaux(response.data);
            });
      }, []);

      const handleChangeEspece = (event) => {
            event.preventDefault();
            axios.get("http://localhost:4000/getAnimaux/"+event.target.value).then((response) => {
                  setAnimaux(response.data);
            });
      }

      const handleChangeAnimal = (event) => {
            event.preventDefault();
            setQuest(event.target.value);
      }

      return (
            <div>
                  <TextField
                        id="cbEspeces"
                        select
                        label="Espèce de l'animal"
                        style={{width : 200}}
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
                        select
                        label="Animaux"
                        style={{width : 200}}
                        defaultValue={1}
                        onChange={handleChangeAnimal}
                  >
                        {animaux.map((unAnimal) => (
                        <MenuItem key={unAnimal.idAnimal} value={unAnimal.idAnimal}>
                              {unAnimal.nomAnimal}
                        </MenuItem>
                        ))}
                  </TextField>
                  <Questionnaire key={quest} idAnimal={quest}></Questionnaire>
            </div>
      );
};

export default QuestionnaireSante;