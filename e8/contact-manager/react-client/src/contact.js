import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      notes: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.getUser(id);
  }
  async getUser(id) {
    try {
      const getResponse = await Axios.get(`http://localhost:3001/users/${id}`);
      this.setState({ firstName: getResponse.data.user.firstName });
      this.setState({ lastName: getResponse.data.user.lastName });
      this.setState({ email: getResponse.data.user.email });
      this.setState({ phoneNumber: getResponse.data.user.phoneNumber });
      this.setState({ notes: getResponse.data.user.notes });
      this.setState({ id: id });
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
          `http://localhost:3001/users/${this.state.id}`,
          userObj
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      // this.getAllUsers();
    }
  }
  render() {
    return (
      this.state.firstName && (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Contact Management</h1>
          </header>
          <div className="container mt-3">
            <div className="row">
              <div className="col-8 offset-2">
                <form>
                  <div className="form-group row">
                    <label
                      htmlFor="firstName"
                      className="col-sm-2 col-form-label"
                    >
                      First Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="firstName-input"
                        value={this.state.firstName}
                        onChange={(e) => {
                          this.setState({
                            firstName: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="lastName"
                      className="col-sm-2 col-form-label"
                    >
                      Last Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="lastName-input"
                        value={this.state.lastName}
                        onChange={(e) =>
                          this.setState({ lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                      Email
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="email-input"
                        value={this.state.email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                      Phone Number
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="email-input"
                        value={this.state.phoneNumber}
                        onChange={(e) =>
                          this.setState({ phoneNumber: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                      Notes
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        type="text"
                        className="form-control"
                        id="email-input"
                        value={this.state.notes}
                        onChange={(e) =>
                          this.setState({ notes: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </form>

                <Button onClick={this.handleClick}>Submit </Button>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default withRouter(Contact);
