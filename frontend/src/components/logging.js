import React from "react";
import "../assets/css/main.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Register from "./register";

function Login() {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("clicked");
        }}
      >
        <div class="field half first">
          <label for="username">username</label>
          <input type="text" name="username" id="username"></input>
        </div>
        <div class="field half">
          <label for="password">password</label>
          <input type="password" name="password" id="password"></input>
        </div>
        <ul class="actions">
          <li>
            <input type="submit" value="log in" class="alt"></input>
          </li>
        </ul>
      </form>

      <div class="copyright">
        Don't have an account?
        <a style={{ color: "blue" }} href="/register">
          register
        </a>
      </div>
    </div>
  );
}

export default Login;
