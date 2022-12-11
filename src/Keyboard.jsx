import React,{useEffect, useState} from "react";
import { useContext } from "react";
import { BoardContext } from "./App";

export const Keyboard =()=>{
    const {clickLetter, clickDelete, clickEnter, colourKey} = useContext(BoardContext);
    const keyLine1 = ["Q","W","E","R","T", "Y","U","I","O","P"];
    const keyLine2 = ["A","S","D","F","G", "H","J","K","L"];
    const keyLine3 = ["Z","X","C","V","B", "N","M"];
    
    const handleKeyBoard = (e)=>{
        if(e.key === "Enter"){
            clickEnter();
        }
        else if(e.key === "Backspace"){
            clickDelete();
        }
        else{
            keyLine1.forEach(key=>{
                if(e.key === key.toLowerCase()){
                    clickLetter(key);
                }
            });
            keyLine2.forEach(key=>{
                if(e.key === key.toLowerCase()){
                    clickLetter(key);
                }
            });
            keyLine3.forEach(key=>{
                if(e.key === key.toLowerCase()){
                    clickLetter(key);
                }
            });
        }
    }
    useEffect(()=>{
        document.addEventListener("keydown", handleKeyBoard);
        return ()=>{
            document.removeEventListener("keydown", handleKeyBoard);
        }
    }, [handleKeyBoard]);
    return (
        <div className="keyboard" onKeyDown={handleKeyBoard}>
            <div className="top-row">
               {keyLine1.map(key=>{
                return (
                    <Key value={key} colour = {colourKey.includes(key)}/>
                )
               })}
            </div>
            <div className="middle-row">
               {keyLine2.map(key=>{
                return (
                    <Key value={key} colour = {colourKey.includes(key)}/>
                )
               })}
            </div>
            <div className="bottom-row">
                <Key value="Del"/>
                {keyLine3.map(key=>{
                return (
                    <Key value={key} colour = {colourKey.includes(key)}/>
                )
               })}
                <Key value="Enter"/>
            </div>
        </div>
    );
    
        
};

const Key =({value, colour})=>{
    const {clickLetter, clickDelete, clickEnter, board, currAttempt, correctWord} = useContext(BoardContext)
    const displayLetter =()=>
    {   
        if(value === "Enter"){
            clickEnter();    
        }
        else if(value === "Del"){
            clickDelete();
        }
        else{
             clickLetter(value);
        }
      
    }
    return (
            value === "Del" ?(
                <div className="key-btn del-key" onClick={displayLetter}>{value}</div>
            ) 
            :value === "Enter" ? 
            (
            <div className="key-btn enter" onClick={displayLetter}>{value}</div>
            )
            :(
            <div className={`key-btn ${colour && "greyColour"}`} onClick={displayLetter}>{value}</div>
            )     
    )
}

