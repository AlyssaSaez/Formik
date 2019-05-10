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
      email: "",
      update: false,
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
  update = e => {
    axios
      .put(`http://localhost:5000/friends/${this.state.id}`, {
        name: this.state.name,
        age: this.state.age,
        email: this.state.email
      })
      .then(res => {
        this.setState({ friends: res.data });
      })
      .catch(err => console.log(err));
    this.setState({ update: false, name: "", age: "", email: "" });
  };
  setUpdate = (e, ids) => {
    this.setState({ update: true, id: ids, name: "", age: "", email: "" });
  };
  delete = (e, ids) => {
    this.setState({ id: ids });
    axios
      .delete(`http://localhost:5000/friends/${ids}`)
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
                  <br />
                  <span className="edit" onClick={x => this.setUpdate(x, e.id)}>
                    Edit
                  </span>
                  <span onClick={x => this.delete(x, e.id)}>&times;</span>
                </div>
              </div>
            );
          })}
        <FriendForm addCb={obj => this.add(obj)} submit={this.submit} />
      </div>
    );
  }
}
