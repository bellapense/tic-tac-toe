import React from "react";
import TicTacToeBoard from "./TicTacToeBoard";
import useGameLogic from "../hooks/useGameLogic";
import '../styles/GameContainer.css';

/**
 * Component that acts as a container for the game. Includes the status bar and the game board.
 */
function GameContainer() {
    const {
        squares,
        handleMove,
        getStatusBar
    } = useGameLogic()

    return (
        <div id="game-container">
            <div>{getStatusBar()}</div>
            <TicTacToeBoard
                squares={squares}
                handleMove={handleMove}
            />
        </div>
    );
}

export default GameContainer;