import { useContext } from "react";
import { QuizContext } from "./context/quiz";
import {useEffect} from "react";


import Welcome from "./componentes/welcome";
import Questions from "./componentes/Questions";
import GameOver from "./componentes/GameOver";

import './App.css'


function App() {
  const [quizState, dispatch] = useContext(QuizContext);

  const nowHour = new Date().getTime();
  const unlockTime = parseInt(localStorage.getItem('quizUnlockTime'));

  useEffect(()=>{
    if(unlockTime && nowHour < unlockTime && quizState.gameStage !== "End"){
      dispatch({type: "SET_GAME_OVER"});
    }
  }, [unlockTime, nowHour, quizState.gameStage, dispatch]);

  useEffect(()=>{
    dispatch({type: "REORDER_QUESTIONS"});
  },[dispatch]);

  
  return (
    <div className="App">
      <h1>Yupi Quiz</h1>
      {quizState.gameStage === "Start" && <Welcome />}
      {quizState.gameStage === "Playing" && <Questions />}
      {quizState.gameStage ==="End" && <GameOver />}
    </div>
  );
}

export default App
