import React, {Component} from "react";
import {withCookies, Cookies} from "react-cookie";
import {instanceOf} from "prop-types";

class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(event) {
    let enteredName = event.target.name.value;
    let loginEndpoint = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/login`);
    let body = {
      'name': enteredName,
    };
    const {cookies} = this.props;

    fetch(loginEndpoint.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: "include",
    })
    .then((response) => {
      if (response.status !== 200) {
        console.error(response);
      }
      return response.json();
    })
    .then(data => {
      cookies.set('token', data.id);
      window.location.reload();
    })
    .catch(error => console.error(error));

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

export default withCookies(Login);
