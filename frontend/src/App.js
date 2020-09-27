import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import Tracker from "./components/tracker";
import Logging from "./components/logging";
import Register from "./components/register";

import "./assets/css/main.css";

function App() {
  document.body.style = "background: #FFFFF0;";
  let logger = "login";
  return (
    <div>
      <header id="header">
        <div class="inner">
          <a href="index.html" class="logo">
            Exercise App
          </a>

          <Router id="nav">
            <div className="App">
              <Link to="/">Home</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/tracker">Tracker</Link>
              <Link to="/logger">{logger}</Link>
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/dashboard" component={Dashboard}></Route>
                <Route exact path="/tracker" component={Tracker}></Route>
                <Route exact path="/logger" component={Logging}></Route>
                <Route exact path="/register" component={Register}></Route>
              </Switch>
            </div>
          </Router>
        </div>
      </header>
    </div>
  );
}

export default App;
