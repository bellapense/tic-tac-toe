import React, {useState, useEffect} from "react";
import TicTacToeBoard from "./TicTacToeBoard";
import '../styles/GameContainer.css';

function GameContainer() {
    return (
        <div id="game-container">
            <TicTacToeBoard />
        </div>
    );
}

export default GameContainer;