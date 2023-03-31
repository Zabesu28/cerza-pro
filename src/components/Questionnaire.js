import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from '@mui/material/Slider';
import '../styles/questionnaireSante.css'

const Questionnaire = () => {

      const [questions, setQuestions] = useState([]);

      useEffect(() => {
            axios.get("http://localhost:4000/getLesQuestions").then((response) => {
                  setQuestions(response.data);
            })
      }, []);

      return (
            <div>
                  {questions.map((uneQuestion) => (
                        <div className='question'>
                              {uneQuestion.libelleQuestion}
                              <Slider valueLabelDisplay="auto" defaultValue={1} step={1} marks min={1} max={5}/>
                        </div>
                  ))}
            </div>
      );
};

export default Questionnaire;