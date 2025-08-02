import React from 'react'
import { useContext } from 'react';
import { QuizContext } from '../context/quiz';

import "./Options.css"

const Options =({ option , selectOption,answer}) =>{
    const [quizState, dispatch] = useContext(QuizContext);



  return (
    <div 
        className = {`options ${
            quizState.answerSelected === option && option === answer ? "correct" : ""
            } ${quizState.answerSelected === option && option !== answer ? "error" : ""}`} 
            
            
            
        onClick={()=> selectOption()}>
        
        <p>{option}</p>
    </div>
  )

}
export default Options