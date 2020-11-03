import React from "react";

/**
 * A square component. Has two props, "value" that is either "X", "O", or "" and onClick function called makeMove
 * that allows the current player to claim the square.
 */
function Square (props) {
    return (
        <div
            className={`square ${props.value}`}
            onClick={() => {props.makeMove()}}
        >
            {props.value}
        </div>
    )
}

export default Square