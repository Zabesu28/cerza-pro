import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from '@mui/material/Slider';
import '../styles/questionnaireSante.css';
import Button from '@mui/material/Button';

const Questionnaire = ({idAnimal}) => {

      const [questions, setQuestions] = useState([]);

      var repondre = [1,1,1,1];

      const handleClick = () => {
            var date = new Date();
            date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
            var i = 1;
            repondre.map((uneReponse) => (
                  axios.post("http://localhost:4000/insertReponses", {
                        idAnimal: idAnimal,
                        idQuestion: i,
                        date: date,
                        reponse: uneReponse,
                  }).then(i = i + 1)
                  
            ))
            alert("Les réponses ont bien été enregistrées !");
      }

      const handleChange = (event) => {
            event.preventDefault();
            repondre[event.target.name-1] = event.target.value;
      }

      useEffect(() => {
            axios.get("http://localhost:4000/getLesQuestions").then((response) => {
                  setQuestions(response.data);
            })
      }, []);

      return (
            <div className='questionnaire'>
                  <p>Evaluation de la santé de l'animal : </p>
                  {questions.map((uneQuestion) => (
                        <div className='question'>
                              {uneQuestion.libelleQuestion}
                              <br/>
                              <div className='reponse'>🙁<Slider className='reponse' name={uneQuestion.idQuestion} onChange={handleChange} valueLabelDisplay="auto" defaultValue={1} step={1} marks min={1} max={5}/>&nbsp;&nbsp;&nbsp;😀</div>
                        </div>
                  ))}
                  <Button className='button' variant="outlined" onClick={handleClick}>Valider</Button>
            </div>
      );
};

export default Questionnaire;