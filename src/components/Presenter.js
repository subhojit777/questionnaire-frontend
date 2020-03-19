import React, {Component} from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts';

class Presenter extends Component {
  constructor(props) {
    super(props);

    this.questions = props.questions;
    this.questionsCount = (this.questions.length - 1);
    this.state = {
      currentPosition: 0,
      options: [],
      answers: new Map(),
    };

    this.loadOptions = this.loadOptions.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
    this.moveForward = this.moveForward.bind(this);
  }

  loadOptions(index) {
    const fetchOptionsByQuestionUrl = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/options-question/${this.questions[index].id}`);

    fetch(fetchOptionsByQuestionUrl.toString(), {
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      // Fetch answers for every option and build state.
      this.loadAnswers(data)
      .then((answers) => {
        this.setState({
          options: data,
          currentPosition: index,
          answers: answers,
        });
      });
    })
    .catch(error => console.error(error));
  }

  async loadAnswers(options) {
    const answers = new Map();

    for (let i = 0; i < options.length; i++) {
      const fetchAnswersByOptionUrl = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/answers-option/${options[i].id}`);

      const fetchResponse = await fetch(fetchAnswersByOptionUrl.toString(), {
        headers: {
          'Accept': 'application/json',
        }
      });
      const data = await fetchResponse.json();

      answers.set(options[i].id, data);
    }

    return answers;
  }

  moveBackward() {
    let newPosition = this.state.currentPosition - 1;
    this.loadOptions(newPosition);
  }

  moveForward() {
    let newPosition = this.state.currentPosition + 1;
    this.loadOptions(newPosition);
  }

  componentDidMount() {
    this.loadOptions(this.state.currentPosition);
  }

  render() {
    const shouldMoveForward = this.state.currentPosition < this.questionsCount;
    const shouldMoveBackward = this.state.currentPosition > 0;
    const question = this.questions[this.state.currentPosition];
    const options = this.state.options.map(option => option.data);
    const answersCountForOptions = [];

    this.state.answers.forEach((answers) => {
      answersCountForOptions.push(answers.length);
    });

    const graphConfig = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Result'
      },
      xAxis: {
        categories: options,
      },
      series: [{
        name: 'Frequency',
        data: answersCountForOptions,
      }]
    };

    return (
      <div>
        <h2>{question.title}</h2>
        <HighchartsReact
          highcharts={Highcharts}
          options={graphConfig}
        />
        <button type="button" className="btn btn-outline-primary" disabled={!shouldMoveBackward} onClick={this.moveBackward}>Backward</button>
        <button type="button" className="btn btn-outline-primary" disabled={!shouldMoveForward} onClick={this.moveForward}>Forward</button>
      </div>
    )
  }
}

export default Presenter;
