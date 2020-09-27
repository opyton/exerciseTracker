import React, { useState } from "react";
import axios from "axios";
import "../assets/css/main.css";

function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [newUser, setNewUser] = useState(true);
  const [user, setUser] = useState("");
  const [pswd, setPswd] = useState("");

  const request_redirect = () => {
    console.log("submitted");
    return (
      <div>
        <a style={{ color: "blue" }} href="/">
          Success! Login Here
        </a>
      </div>
    );
  };
  const form_submission = () => {
    const newUserAlert = () => {
      if (!newUser) {
        return (
          <div style={{ color: "blue" }}>
            not a unique user please try again
          </div>
        );
      } else {
        return null;
      }
    };
    return (
      <>
        {newUserAlert()};
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const objRdy = new Promise((resolve, reject) => {
              const objForSubmission = {
                user: user,
                pswd: pswd,
              };
              objForSubmission
                ? resolve(objForSubmission)
                : reject("invalid object");
            });
            objRdy
              .then((obj) =>
                axios
                  .post("http://localhost:4000/users/register", obj)
                  .then((response) => setSubmitted(true))
                  .catch((err) => setNewUser(false))
              )
              .catch((err) => setNewUser(false));
          }}
        >
          <div class="field">
            <label for="username">username</label>
            <input
              onChange={(e) => {
                setUser(e.target.value);
              }}
              type="text"
              name="username"
              id="username"
            ></input>
          </div>
          <div class="field">
            <label for="password">password</label>
            <input
              onChange={(e) => {
                setPswd(e.target.value);
              }}
              type="password"
              name="password"
              id="password"
            ></input>
          </div>
          <ul class="actions">
            <li>
              <input type="submit" value="Register" class="alt"></input>
            </li>
          </ul>
        </form>
      </>
    );
  };
  return (
    <div>
      <h1>Register</h1>
      {submitted ? request_redirect() : form_submission()}
    </div>
  );
}

export default Register;
