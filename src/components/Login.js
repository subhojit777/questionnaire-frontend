import React, {Component} from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(event) {
    let loginEndpoint = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/login`);
    let body = {
      'name': event.target.name.value,
    };

    fetch(loginEndpoint.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then((response) => {
      if (response.status !== 200) {
        // TODO: Show error.
      }
      else {
        // TODO: Set the cookie.
        console.log(response);
      }
    })
    .catch(error => console.log(error));

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
