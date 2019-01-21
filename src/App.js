import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import "./normalize.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Rejection</h1>
          <p>You gotta lose to win</p>
          <Home />
        </header>
      </div>
    );
  }
}

export default App;
