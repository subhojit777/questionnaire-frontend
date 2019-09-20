import React, {Component} from "react";

class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type ? props.type : 'success',
      message: props.message,
    };
  }

  render() {
    let className = `alert alert-${this.state.type}`;

    return (
      <div className={className} role="alert">{this.state.message}</div>
    );
  }
}

export default Alert;
