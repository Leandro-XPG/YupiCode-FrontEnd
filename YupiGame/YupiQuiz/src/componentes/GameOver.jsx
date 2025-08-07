import React, { useEffect, useRef } from 'react'
import { useContext } from "react";
import { QuizContext } from "../context/quiz";


import theEnd from "../img/clock.svg";

import "./GameOver.css";
import Questions from './Questions';

const GameOver = () => {
   const [quizState, dispatch] = useContext(QuizContext);
   const [TempoFormatado, setTempoFormatado] = useState("");
   const contador = useRef(null);
  
   

    useEffect(()=>{
      const tempoDeEspera = 12 * 60 * 60 *1000;
      const now = new Date().getTime();

      let unlock = localStorage.getItem('quizUnlockTime');

      if(!unlock){
        const novoUnlock = now + tempoDeEspera;
        localStorage.setItem('quizUnlockTime', novoUnlock.toString());
        unlock = novoUnlock;
      }




      const intervalo = setInterval(()=>{
        const agora = new Date().getTime();
        const unlockTime = parseInt(localStorage.getItem('quizUnlockTime'));
        const diff = unlockTime - agora;

        if(diff <= 0){
          clearInterval(intervalo);
          localStorage.removeItem('quizUnlockTime');

          dispatch({type: 'RETURN_STATE'});
          return;
        }



      let tempo = Math.floor(diff/1000);
      let horas = Math.floor(tempo / 3600);
      let minutos = Math.floor((tempo % 3600) /60);
      let segundos = tempo % 60;

      const formatacao =
      String(horas).padStart(2,'0') + ':' +
      String(minutos).padStart(2,'0') + ':' +
      String(segundos).padStart(2, '0');

    setTempoFormatado(formatacao);
      localStorage.setItem("tempoRestante", tempo);
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
          <h3>{TempoFormatado}</h3>
        </div>
        
        <img src={theEnd} alt="gameOver" />
        <button onClick={()=>{window.location.href="https://leandro-xpg.github.io/YupiCode-FrontEnd/"}}>Voltar</button>
    </div>
  )
}

export default GameOver