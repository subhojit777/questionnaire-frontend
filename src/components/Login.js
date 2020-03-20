import React, {Component} from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(event) {
    console.log(event.target.name.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>Please enter your name</h3>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <input type="text" className="form-control" id="name" required={true} />
          </div>
          <div className="btn-toolbar">
            <button type="submit" className="btn btn-success">Proceed</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
