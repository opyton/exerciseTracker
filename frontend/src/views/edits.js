import React, { useState } from "react";
import Header from "./partials/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import Axios from "axios";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";

const EditForm = () => {
  const url = "http://localhost:4000/lifts";
  const urlElements = window.location.href.split("/");
  const element = urlElements[urlElements.length - 1];
  const allLifts = ["Bench", "Incline_Bench", "Squat", "Deadlift"];

  const history = useHistory();

  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);

  const AllUsers = GetUsers();

  if (loaded === false) {
    Axios.get(url + "/" + element, { withCredentials: true }).then((res) => {
      setData(res.data);
      setLoaded(true);
    });
  } else {
    return (
      <>
        <h1>Edit</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            Axios.put(
              url + "/" + element,
              {
                user: data.user,
                date: data.date,
                lift_amount: data.lift_amount,
                type: data.type,
                reps: data.reps,
                sets: data.sets,
              },
              { withCredentials: true }
            );
            history.push("/lifts");
          }}
        >
          <label>User</label>
          <select onChange={(e) => setData({ ...data, user: e.target.value })}>
            {AllUsers}
          </select>
          <label>Type</label>
          <select onChange={(e) => setData({ ...data, type: e.target.value })}>
            <option key="original" value={data.type}>
              {data.type}
            </option>
            {allLifts.map((lift) =>
              lift != data.type ? (
                <option key={lift} value={lift}>
                  {lift}
                </option>
              ) : null
            )}
          </select>
          <label>Amount</label>
          <input
            type="number"
            onChange={(e) => setData({ ...data, lift_amount: e.target.value })}
            value={data.lift_amount}
          ></input>
          <label>Reps</label>
          <input
            type="number"
            onChange={(e) => setData({ ...data, reps: e.target.value })}
            value={data.reps}
          ></input>
          <label>Sets</label>
          <input
            type="number"
            onChange={(e) => setData({ ...data, sets: e.target.value })}
            value={data.sets}
          ></input>
          <label>Date</label>
          <DatePicker
            selected={Date.parse(data.date)}
            onChange={(date) => setData({ ...data, date: date })}
          />
          <input type="submit" value="Save"></input>
        </form>
      </>
    );
  }
  return <div>Error Loading Data</div>;
};

const GetUsers = () => {
  const url = "http://localhost:4000/lifts";

  const [liftData, setLiftData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  if (loaded === false) {
    Axios.get(url, { withCredentials: true }).then((res) => {
      setLiftData(res.data);
      setLoaded(true);
    });
  } else {
    let uniqueUser = liftData.map((lift) => lift.user);
    let unique = [...new Set(uniqueUser)];

    return (
      <>
        <option />
        {unique.map((user) => (
          <option value={user}>{user}</option>
        ))}
      </>
    );
  }
  return <option>Error Loading Data</option>;
};

const EditPage = () => {
  return (
    <>
      <Header />
      {EditForm()}
      <div className="fixed-bottom">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand className="m-auto">Footer</Navbar.Brand>
        </Navbar>
      </div>
    </>
  );
};

export default EditPage;
