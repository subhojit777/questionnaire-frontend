import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Participant from "./components/Participant";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/participant' component={Participant} />
      </Switch>
    </Router>
  );
}

export default App;
