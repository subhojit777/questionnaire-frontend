import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Participant from "./components/Participant";
import {Cookies, withCookies} from "react-cookie";
import GhRedirect from "./components/GhRedirect";
import {instanceOf} from "prop-types";

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const {cookies} = props;
    this.state = {
      token: cookies.get('token') || null,
    };
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/participant' render={(routeProps) => (
            <Participant {...routeProps} accessToken={this.state.token} />
          )} />
          <Route path='/gh-redirect' component={GhRedirect} />
        </Switch>
      </Router>
    );
  }
}

export default withCookies(App);
