import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Contact from "./contact";
import Contacts from "./contacts";

class App extends Component {
  render() {
    const App = () => (
      <Switch>
        <Route exact path="/" component={Contacts} />
        <Route path="/user/:id" component={Contact} />
      </Switch>
    );
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
