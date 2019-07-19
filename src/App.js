import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Participant from "./components/Participant";
import {withCookies} from "react-cookie";
import GhRedirect from "./components/GhRedirect";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/participant' component={Participant} />
          <Route path='/gh-redirect' component={GhRedirect} />
        </Switch>
      </Router>
    );
  }
}

export default withCookies(App);
