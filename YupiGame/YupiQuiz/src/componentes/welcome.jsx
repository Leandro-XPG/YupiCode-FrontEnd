
import { useContext } from 'react';
import { QuizContext } from '../context/quiz';

import React from 'react'
import Quiz from "../img/YupiQuiz.svg";
import './welcome.css';

const welcome = () => {

  const [quizState, dispatch] = useContext(QuizContext);
  return (
    <div id='welcome'>
        <h2>Seja bem vindo ao Yupi Quiz!</h2>
        <button onClick={()=>dispatch({type: "CHANGE_STATE"})}>Começar</button>
        <img src={Quiz} alt="Inicio do Quiz" />
    </div>
  )
}

export default welcome