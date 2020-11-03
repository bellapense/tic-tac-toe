import {useState, useEffect} from "react"

/**
 * Hook that contains
 */
function useTicTacToeLogic () {
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
            }
        }
        if (!squares.includes("")) {
            return "tie";
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

    return {
        squares,
        handleMove,
        isPlayerX,
        undoLastMove,
        setStartNewGame,
        moveHistory,
        calculateWinner
    };
}

export default useTicTacToeLogic