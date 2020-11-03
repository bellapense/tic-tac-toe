import React, {useState, useEffect} from "react"

/**
 * Hook that contains the logic for the tic-tac-toe game. Returns:
 * 1) a function getStatusBar that returns a component containing the game's "status bar" which contains the
 * current player move and undo button, or displays the result of a game and button to begin a new game.
 * 2) array containing the state of squares in the game board
 * 3) function to handle a click of a square to "make a move"
 * @returns {{getStatusBar: (function(): *), squares: any[], handleMove: (function(*): (undefined))}}
 */
function useGameLogic () {
    const [isPlayerX, setIsPlayerX] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [startNewGame, setStartNewGame] = useState(false);
    const [moveHistory, setMoveHistory] = useState([]);

    /**
     * Handles starting a new game by resetting current states.
     */
    useEffect(() => {
        if (startNewGame) {
            setSquares(Array(9).fill(""));
            setIsPlayerX(true);
            setStartNewGame(false);
            setMoveHistory([]);
        }
    }, [startNewGame])

    /**
     * Takes index of the square a player is making a move in and updates the state of that square, records
     * the move in the history, and changes the player.
     * @param i
     */
    function handleMove(i) {
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

    /**
     * Takes in the array of 9 squares and checks for winning combinations. Returns the winning player,
     * "tie" in the case of a tie, and null in the case of no winner (game is on-going).
     *
     * @param squares
     * @returns {string|null|*}
     */
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

    /**
     * Function to undo the previous move. Only available if the game has not yet been won (game is still on-going)
     * and there is a move to be undone.
     */
    function undoLastMove() {
        const previousMoves = moveHistory.slice();
        const move = previousMoves.pop();
        setSquares(prevSquares => {
            const squares = prevSquares.slice();
            squares[move] = "";
            return squares;
        });
        setIsPlayerX(prevIsPlayerX => {
            return !prevIsPlayerX;
        });
        setMoveHistory(previousMoves);
    }

    //Button to start a new game
    const playNewGame = (
        <button
            onClick={() => setStartNewGame(true)}
        >
            Play again?
        </button>
    );

    /**
     * Returns the game's status bar. Displays current player move and undo button (if there is a move that can
     * be undone) or the result of a game and button to start a new game.
     */
    function getStatusBar () {
        let undoButton = null;
        if (moveHistory.length) {
            undoButton = (
                <button
                    onClick={undoLastMove}
                >
                    Undo Move
                </button>
            );
        }
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

    return {
        squares, handleMove, getStatusBar
    };
}

export default useGameLogic