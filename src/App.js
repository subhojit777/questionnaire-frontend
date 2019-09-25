import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Participant from "./components/Participant";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";
import WaitMessage from "./components/WaitMessage";
import Presenter from "./components/Presenter";
import QuestionIndex from "./contexts/QuestionIndex";

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const {cookies} = props;
    // TODO: Unhardcode the default presentation ID.
    this.state = {
      token: cookies.get('token') || null,
      presentationId: cookies.get('pid') || 2,
      questions: null,
      questionIndex: -1,
    };
  }

  getQuestionsByPresentation(presentationId) {
    let url = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/questions-presentation`);
    url.search = new URLSearchParams({presentation_id: presentationId}).toString();

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
    this.getQuestionsByPresentation(this.state.presentationId);
  }

  render() {
    if (this.state.questions) {
      return (
        <QuestionIndex.Provider value={this.state.questionIndex}>
          <Router>
            <Switch>
              <Route path='/' render={(routeProps) => (
                // TODO: Find out how to alter the question index.
                // TODO: https://reactjs.org/docs/context.html#updating-context-from-a-nested-component
                <Presenter {...routeProps} question={this.state.question} />
              )} />
              <Route path='/participant' render={(routeProps) => (
                <Participant {...routeProps} token={this.state.token} questions={this.state.questions} questionIndex={this.state.questionIndex} />
              )} />
            </Switch>
          </Router>
        </QuestionIndex.Provider>
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
