import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      notes: "",
      allname: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.getAllUsers();
  }
  async getAllUsers() {
    try {
      const getResponse = await Axios.get(`http://localhost:3001/users`);
      this.setState({ allname: getResponse.data.users });
    } catch (error) {
      console.log(error);
    }
  }
  async handleClick() {
    if (
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.email !== "" &&
      this.state.phoneNumber !== ""
    ) {
      var userObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        notes: this.state.notes,
      };
      try {
        const response = await Axios.post(
          `http://localhost:3001/users`,
          userObj
        );
      } catch (error) {
        console.log(error);
      }
      this.getAllUsers();
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Contact Management</h1>
        </header>
        <div className="mt-5">
          <div>Add New Contact</div>
          <div className="mt-3">
            <input
              type="text"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={(e) => this.setState({ firstName: e.target.value })}
            />
            <br />
            <input
              type="text"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={(e) => this.setState({ lastName: e.target.value })}
            />
            <br />
            <input
              type="text"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <br />
            <input
              type="Phone Number"
              placeholder="Phone Number"
              value={this.state.phoneNumber}
              onChange={(e) => this.setState({ phoneNumber: e.target.value })}
            />
            <br />
            <textarea
              placeholder="Notes"
              value={this.state.notes}
              onChange={(e) => this.setState({ notes: e.target.value })}
            />
            <br />
            <Button onClick={this.handleClick}> Submit </Button>
          </div>
          <hr />
          <div className="theList1">
            Contacts
            <ol className="theList">
              {this.state.allname.map(function (user, index) {
                return (
                  <Link key={index} to={`/user/${user._id}`}>
                    <li>{user.firstName + " " + user.lastName}</li>
                  </Link>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Contacts);
