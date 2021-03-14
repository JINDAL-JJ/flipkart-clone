import React from "react";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./containers/HomePage";

function App() {
    return (
        <div className="App">
            <Header />
            <HomePage />
        </div>
    );
}

export default App;