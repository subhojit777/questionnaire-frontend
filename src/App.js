import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Participant from "./components/Participant";
import {withCookies} from "react-cookie";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/participant' component={Participant} />
        </Switch>
      </Router>
    );
  }
}

export default withCookies(App);
