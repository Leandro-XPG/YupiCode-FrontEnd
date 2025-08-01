import React from 'react'
import { useContext } from "react";
import { QuizContext } from "../context/quiz";


import theEnd from "../img/clock.svg";

import "./GameOver.css";

const GameOver = () => {
  return (
    <div id='gameOver'>
        <h2>Fim de jogo!</h2>
        <p>Pontuação: xxx </p>
        <p>Você acertou y de z perguntas!</p>
        <button>Voltar</button>
        <img src={theEnd} alt="gameOver" />
    </div>
  )
}

export default GameOver