import React, { useReducer } from 'react';
import { wordBoard} from './Words';
import { createContext, useState, useEffect } from 'react';
import Board from './Board';
import words from "./words.txt"
export const BoardContext = createContext();

const reducer = (state, action)=>{
   if(action.type === "CORRECT_POSITION"){
    const newArr = [...state.setGreen, action.payload]
    const yellowColour = state.setYellow.filter(char => char !== action.payload);
     return {
      ...state,
      setGreen : newArr,
      setYellow : yellowColour
    }
  }
  else if(action.type === "INCLUDED"){
    let newArr;
    if(!state.setGreen.includes(action.payload)){
       newArr = [...state.setYellow, action.payload]
    }
     return {
      ...state,
      setYellow : newArr || [...state.setYellow]
    }
  }
  else if(action.type === "NOT_INCLUDED"){
    const newArr = [...state.setGrey, action.payload]
    return {
      ...state,
      setGrey : newArr
    }
  }
}
const initialState = {
  setGreen:[],
  setGrey: [],
  setYellow: []
}
function App() {
  const [board, setBoard] = useState(wordBoard);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [correctWord, setCorrectWord] = useState("");
  const [wordBank, setWordBank] = useState([]);
  const [colourState, dispatch] = useReducer(reducer, initialState);

  const clickLetter = (value)=>{
     if(currAttempt.letterPos > 4) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos] = value;
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos +1});
  };
  const clickDelete =()=>{
    if(currAttempt.letterPos === 0)return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos-1] = "";
        setBoard(newBoard);
         setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos -1});
       
  };
  const clickEnter =()=>{
    if(currAttempt.letterPos !== 5) return;
    if(currAttempt.attempt === 5){
      const lastAttempt = board[board.length -1].join("").toLowerCase(); 
      if(wordBank.includes(lastAttempt)){
         lastAttempt !== correctWord && setTimeout(()=>{
            alert(`The Correct Word was: ${correctWord}`);
            window.location.reload();}
            ,750);
      }
    }
            const userAnswer = board[currAttempt.attempt].join("").toLowerCase();
            if(wordBank.includes(userAnswer)){
              setCurrAttempt({...currAttempt, attempt: currAttempt.attempt+1, letterPos: 0});
            userAnswer === correctWord && setTimeout(()=>{
            alert("You Won!!");
            window.location.reload();}
            ,750);
            }
            else if(!wordBank.includes(userAnswer)){
              alert("This word doesn't contain in the library");
              const newBoard = [...board];
              for(let i = 0; i< userAnswer.length; i++){
                newBoard[currAttempt.attempt][i] = ""; 
              }
              setCurrAttempt({...currAttempt, letterPos: 0});
                setBoard(newBoard);
            }
  };

  const fetchWords = async()=>{
    try {
        let result;
        const res = await fetch(words);
        const data = await res.text();
        result = data.split('\n');
        return result
    } catch (error) {
        console.log(error);
    }
  };

  const randomNum = (x)=>{
    return Math.floor(Math.random()* x);
  }
  useEffect(() => {
      fetchWords()
      .then(res=> {
        setCorrectWord(res[randomNum(res.length)]);
        setWordBank(res);
      })

      
  }, []);
  return (
    <BoardContext.Provider value = {{board, setBoard, currAttempt, setCurrAttempt, clickDelete, clickLetter, clickEnter, correctWord,dispatch, colourState}}>
          <nav id="main-navbar">
            WORDLE BY NIPPON
        </nav>
        <Board/>
    </BoardContext.Provider>
  );
}

export default App;
