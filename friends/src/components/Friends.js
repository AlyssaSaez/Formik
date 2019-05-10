import React from "react";
import "./Friends.css";
import axios from "axios";
import FriendForm from "./Form";

export default class Friends extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      name: "",
      age: "",
      email: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/friends")
      .then(res => {
        this.setState({
          friends: res.data
        });
      })
      .catch(err => console.log(err));
  }
  submit = values => {
    axios
      .post("http://localhost:5000/friends", {
        name: values.name,
        age: values.age,
        email: values.email
      })
      .then(res => {
        this.setState({ friends: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="people-container">
        {this.state.friends &&
          this.state.friends.map(e => {
            return (
              <div key={e.id} className="people">
                <div>
                  {e.name}, {e.age}, {e.email}
                </div>
              </div>
            );
          })}
        <FriendForm addCb={obj => this.add(obj)} submit={this.submit} />
      </div>
    );
  }
}
