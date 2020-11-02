import React, { useState } from "react";

function Square (props) {
    return (
        <div
            className={`square ${props.value}`}
            onClick={() => {props.onClick()}}
        >
            {props.value}
        </div>
    )
}

export default Square