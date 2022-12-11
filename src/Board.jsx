import { useContext } from "react";
import { Letter } from "./Letter";
import { BoardContext } from "./App";
import { Keyboard } from "./Keyboard";
const Board =()=>{
    const {board, setBoard} = useContext(BoardContext);
    return (
        <main id="main">
            <div className="container">
                <div className="game">
                    <div className="letter">
                        <div className="row">
                            <Letter letterPos={0} attempVal={0}/>
                            <Letter letterPos={1} attempVal={0}/>
                            <Letter letterPos={2} attempVal={0}/>
                            <Letter letterPos={3} attempVal={0}/>
                            <Letter letterPos={4} attempVal={0}/>
                        </div>
                        <div className="row">
                            <Letter letterPos={0} attempVal={1}/>
                            <Letter letterPos={1} attempVal={1}/>
                            <Letter letterPos={2} attempVal={1}/>
                            <Letter letterPos={3} attempVal={1}/>
                            <Letter letterPos={4} attempVal={1}/>
                        </div>
                        <div className="row">
                            <Letter letterPos={0} attempVal={2}/>
                            <Letter letterPos={1} attempVal={2}/>
                            <Letter letterPos={2} attempVal={2}/>
                            <Letter letterPos={3} attempVal={2}/>
                            <Letter letterPos={4} attempVal={2}/>
                        </div>
                        <div className="row">
                            <Letter letterPos={0} attempVal={3}/>
                            <Letter letterPos={1} attempVal={3}/>
                            <Letter letterPos={2} attempVal={3}/>
                            <Letter letterPos={3} attempVal={3}/>
                            <Letter letterPos={4} attempVal={3}/>
                        </div>
                        <div className="row">
                            <Letter letterPos={0} attempVal={4}/>
                            <Letter letterPos={1} attempVal={4}/>
                            <Letter letterPos={2} attempVal={4}/>
                            <Letter letterPos={3} attempVal={4}/>
                            <Letter letterPos={4} attempVal={4}/>
                        </div>
                        <div className="row">
                            <Letter letterPos={0} attempVal={5}/>
                            <Letter letterPos={1} attempVal={5}/>
                            <Letter letterPos={2} attempVal={5}/>
                            <Letter letterPos={3} attempVal={5}/>
                            <Letter letterPos={4} attempVal={5}/>
                        </div>
                    </div>
                    <Keyboard/>
                </div>
            </div>
        </main>
    );
};

export default Board;