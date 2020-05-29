import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Participant from "./components/Participant";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";
import WaitMessage from "./components/WaitMessage";
import Presenter from "./components/Presenter";
import {w3cwebsocket as W3CWebSocket} from "websocket";

const client = new W3CWebSocket(`${process.env.REACT_APP_WEB_SOCKET_URL}/ws/`);

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const {cookies} = props;

    // TODO: Unhardcode the default presentation ID.
    this.presentationId = cookies.get('pid') || 2;
    this.state = {
      token: cookies.get('token') || null,
      questions: null,
      questionIndex: 0,
    };
  }

  getQuestionsByPresentation(presentationId) {
    let url = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/questions-presentation/${presentationId}`);

    fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        questions: data,
        questionIndex: 0,
      });
    })
    .catch(error => console.error(error));
  }

  componentDidMount() {
    client.onopen = () => console.log("websocket client connected.");
    this.getQuestionsByPresentation(this.presentationId);
  }

  render() {
    if (this.state.questions) {
      return (
        <Router>
          <Switch>
            <Route path='/participant' render={(routeProps) => (
              <Participant {...routeProps} token={this.state.token} questions={this.state.questions} questionIndex={this.state.questionIndex} webSocketClient={client} />
            )} />
            <Route path='/'>
              <Presenter questions={this.state.questions} presentationId={this.presentationId} webSocketClient={client} />
            </Route>
          </Switch>
        </Router>
      );
    }
    else {
      return (
        <WaitMessage />
      );
    }
  }
}

export default withCookies(App);
