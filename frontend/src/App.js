import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Lifts from "./views/lifts";
import Home from "./views/home";
import Edits from "./views/edits";

//https://www.geeksforgeeks.org/reactjs-router/

function App() {
  return (
    <span>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/Lifts" component={Lifts}></Route>
          <Route exact path="/Edits/:id" component={Edits}></Route>
          <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        </Switch>
      </Router>
    </span>
  );
}

export default App;
