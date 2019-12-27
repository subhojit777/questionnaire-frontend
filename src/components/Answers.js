import React, {Component} from "react";

class Answers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: props.question,
    };
  }

  componentDidMount() {
    this.loadOptions();
  }

  loadOptions() {
    let url = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/options-question`);
    url.search = new URLSearchParams({question_id: this.state.question.id}).toString();

    fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        options: data,
      });
    })
    .catch(error => console.error(error));
  }

  render() {
    let options = this.state.options;
    let rows = [];

    if (!options) {
      return (
        <div>Loading answers...</div>
      );
    }

    // TODO: Fix - Options not updated when question is changed.
    for (let i = 0; i < options.length; i++) {
      rows.push(<div>{options[i].data}</div>);
    }

    return (
      <div>{rows}</div>
    );
  }
}

export default Answers;
