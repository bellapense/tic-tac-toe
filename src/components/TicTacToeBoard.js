import React, {useState, useEffect} from "react";
import Square from "./Square";

function TicTacToeBoard () {
    const [isPlayerX, setIsPlayerX] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [startNewGame, setStartNewGame] = useState(false);
    const [moveHistory, setMoveHistory] = useState([]);

    useEffect(() => {
        if (startNewGame) {
            setSquares(Array(9).fill(""));
            setIsPlayerX(true);
            setStartNewGame(false);
        }
    }, [startNewGame])

    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        setSquares(prevSquares => {
            const squares = prevSquares.slice();
            squares[i] = isPlayerX ? "X" : "O";
            return squares;
        })
        setIsPlayerX(prevIsPlayerX => {
            return !prevIsPlayerX;
        })
        setMoveHistory(prevMoveHistory => [...prevMoveHistory, i])
    }

    function renderSquare(i) {
        return <Square
            value={squares[i]}
            onClick={() => {
                handleClick(i)
            }}
        />;
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            } else if (!squares.includes("")) {
                return "tie";
            }
        }
        return null;
    }

    const playNewGame = (
        <button
            onClick={() => setStartNewGame(true)}
        >
            Play again?
        </button>
    );

    function getStatusBar () {
        let undoButton = null;
        if (moveHistory.length) {
            undoButton = (
                <button
                    onClick={undoLastMove}
                >
                    Undo Move
                </button>
            )
        }
        const winner = calculateWinner(squares);
        switch (winner) {
            case "tie":
                return (
                    <React.Fragment>
                        <p>Tie!</p>
                        {playNewGame}
                    </React.Fragment>
                );
            case "X":
            case "O":
                return (
                    <React.Fragment>
                        <p>{winner} is the winner!</p>
                        {playNewGame}
                    </React.Fragment>
                );
            default:
                return (
                    <React.Fragment>
                        <p>{isPlayerX ? "X's" : "O's"} turn!</p>
                        {undoButton}
                    </React.Fragment>

                );
        }
    }

    function undoLastMove() {
        const previousMoves = moveHistory.slice()
        const move = previousMoves.pop()
        setSquares(prevSquares => {
            const squares = prevSquares.slice();
            squares[move] = "";
            return squares;
        })
        setIsPlayerX(prevIsPlayerX => {
            return !prevIsPlayerX;
        })
        setMoveHistory(previousMoves)
    }

    return (
        <React.Fragment>
            <div>{getStatusBar()}</div>
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
        </React.Fragment>
    )
}

export default TicTacToeBoard;