import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from '@mui/material/Slider';
import '../styles/questionnaireSante.css'

const LastQuestionnaire = ({idAnimal}) => {

      const [questions, setQuestions] = useState([]);

      useEffect(() => {
            axios.get("http://localhost:4000/getDernierQuestionnaire/"+idAnimal).then((response) => {
                  setQuestions(response.data);
            })
      }, []);

      function convertirDate(date){
            const dater = new Date(date);
            const options = { weekday: 'long', year: 'numeric', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
            const formattedDate = dater.toLocaleDateString('fr-FR', options);
                    
            const formattedDateCapitalized = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

            const LaDate = formattedDateCapitalized.replace(":","h")
                    
            return LaDate
      }

      if(questions.length != 0){
            return (
                  <div className='questionnaire'>
                        <p>Dernière évaluation : {convertirDate(questions[0].dateRepondre)}</p>
                        {questions.map((uneQuestion) => (
                              <div className='question'>
                                    {uneQuestion.libelleQuestion}
                                    <Slider name={uneQuestion.idQuestion} valueLabelDisplay="auto" disabled defaultValue={uneQuestion.reponse} step={1} marks min={1} max={5}/>
                              </div>
                        ))}
                  </div>
            );
      }else{
            return (
                  <div className='questionnaire'>
                        <p>Aucun audit de santé réalisé !</p>
                  </div>
            )
      }
};

export default LastQuestionnaire;