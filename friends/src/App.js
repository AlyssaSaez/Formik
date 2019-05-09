import React, { Component } from "react";
import "./App.css";
import Friends from "./components/Friends";
import FriendForm from "./components/Form";



class App extends Component {
  render() {
    return (
      <div className="App">
        <Friends />
        <FriendForm addCb={obj => this.add(obj)}/>
      </div>
    );
  }
}

export default App;