import React from 'react'
import { useContext } from "react";
import { QuizContext } from "../context/quiz";


import theEnd from "../img/clock.svg";

import "./GameOver.css";
import Questions from './Questions';

const GameOver = () => {
   const [quizState, dispatch] = useContext(QuizContext);


  return (
    <div id='gameOver'>
        <h2>Fim de jogo!</h2>
        <p>Você acertou {quizState.score} de {quizState.questions.length} perguntas!</p>
        <button>Voltar</button>
        <img src={theEnd} alt="gameOver" />
    </div>
  )
}

export default GameOver