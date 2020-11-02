import './App.css';
import GameContainer from "./components/GameContainer";

import React, {useState} from "react";

function App() {
    return (
        <div className="App">
            <h1>Tic-Tac-Toe</h1>
            <GameContainer />
        </div>
    );
}

export default App;
