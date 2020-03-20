import React, {Component} from "react";

class Login extends Component{
  render() {
    return (
      <div>
        <h3>Please enter your name</h3>
        <form>
          <div className="form-group">
            <input type="text" className="form-control" id="name" />
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
