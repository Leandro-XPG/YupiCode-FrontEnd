import React, { useEffect, useRef } from 'react'
import { useContext } from "react";
import { QuizContext } from "../context/quiz";


import theEnd from "../img/clock.svg";

import "./GameOver.css";
import Questions from './Questions';

const GameOver = () => {
   const [quizState, dispatch] = useContext(QuizContext);

   //timer
    let tempoInicial = 43200;

    const contador = useRef(null);

    useEffect(()=>{
      localStorage.setItem('gameStateLock', 'true');

      let tempo = parseInt(localStorage.getItem("tempoRestante")) || tempoInicial;

       const intervalo = setInterval(()=>{
      let horas = Math.floor(tempo / 3600);
      let minutos = Math.floor((tempo % 3600) /60);
      let segundos = tempo % 60;

      const formatacao =
      String(horas).padStart(2,'0') + ':' +
      String(minutos).padStart(2,'0') + ':' +
      String(segundos).padStart(2, '0');

      if(contador.current){
        contador.current.textContent = formatacao;
      };
      localStorage.setItem("tempoRestante", tempo);

      if(tempo <= 0){
        clearInterval(intervalo);
        localStorage.removeItem("tempoRestante");
        localStorage.removeItem("gameStateLock");

        dispatch({type: 'RETURN_STATE'});
    };

      tempo--;
    },1000);
    return () => clearInterval(intervalo);
    }, [dispatch]);

    const lock = localStorage.getItem('gameStateLock');
    if(lock === 'false'){
      dispatch({type: "RETURN_STATE"});
      return null;
    }

  

   

   
  //fim timer
  return (
    <div id='gameOver'>
        <h2>Fim de jogo!</h2>
        <p>Você acertou {quizState.score} de {quizState.questions.length} perguntas!</p>
        <div className="contador">
          <h3 ref={contador}></h3>
        </div>
        
        <img src={theEnd} alt="gameOver" />
    </div>
  )
}

export default GameOver