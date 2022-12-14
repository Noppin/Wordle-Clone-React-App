import React, { useContext, useEffect } from "react";
import { BoardContext } from "./App";
export const Letter =  ({letterPos, attempVal})=>{
    const {board, correctWord, currAttempt, dispatch} = useContext(BoardContext);
    const letter = board[attempVal][letterPos];

    const correctPos = correctWord[letterPos] === letter.toLowerCase();
    const wrongPos =  letter!== "" && !correctPos && correctWord.includes(letter.toLowerCase());
    const letterState = currAttempt.attempt > attempVal && (correctPos ? "greenColour": wrongPos ? "yellowColour": "greyColour");

    useEffect(()=>{
        if(!correctPos && letter !== "" && !wrongPos){
          dispatch({type: "NOT_INCLUDED", payload: letter});
        }
        else if(!correctPos && letter !== "" && wrongPos){
            dispatch({type: "INCLUDED",payload: letter});
        }
        else if(correctPos){
            dispatch({type: "CORRECT_POSITION", payload: letter});
        }
    }, [currAttempt.attempt]);
    return (
        <div className={`char ${letterState}`}>{letter}</div>
    );
}