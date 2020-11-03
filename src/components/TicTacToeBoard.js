import React from "react";
import Square from "./Square";

/**
 * Takes in an array of squares for the game and a function to pass to the square that allows a player to claim it
 */
function TicTacToeBoard (props) {
    function renderSquare(i) {
        return <Square
            value={props.squares[i]}
            makeMove={() => {
                props.handleMove(i)
            }}
        />;
    }

    return (
            <div id="tic-tac-toe-board">
                <div className="row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
    )
}

export default TicTacToeBoard;