import React from "react";
import TicTacToeBoard from "./TicTacToeBoard";
import useTicTacToeLogic from "../hooks/useTicTacToeLogic";

/**
 * Component that acts as a container for the game. Includes the status bar and the game board.
 */
function GameContainer() {
    const {
        squares,
        handleMove,
        isPlayerX,
        undoLastMove,
        setStartNewGame,
        moveHistory,
        calculateWinner
    } = useTicTacToeLogic()

    //Button to start a new game
    const playNewGame = (
        <button
            onClick={() => setStartNewGame(true)}
        >
            Play again?
        </button>
    );

    //Button to undo a move
    const undoButton = (
        <button
            onClick={undoLastMove}
        >
            Undo Move
        </button>
    );

    /**
     * Returns the game's status bar. Displays current player move and undo button (if there is a move that can
     * be undone) or the result of a game and button to start a new game.
     */
    function getStatusBar () {
        const winner = calculateWinner(squares);
        switch (winner) {
            case "tie":
                return (
                    <React.Fragment>
                        <p>Tie game!</p>
                        {playNewGame}
                    </React.Fragment>
                );
            case "X":
            case "O":
                return (
                    <React.Fragment>
                        <p><span className={winner}>{winner}</span> is the winner!</p>
                        {playNewGame}
                    </React.Fragment>
                );
            default:
                return (
                    <React.Fragment>
                        <p><span className={isPlayerX ? "X" : "O"}>{isPlayerX ? "X" : "O"}</span>'s turn!</p>
                        {moveHistory.length ? undoButton : null}
                    </React.Fragment>

                );
        }
    }

    return (
        <div id="game-container">
            <TicTacToeBoard
                squares={squares}
                handleMove={handleMove}
            />
            <div>{getStatusBar()}</div>
        </div>
    );
}

export default GameContainer;