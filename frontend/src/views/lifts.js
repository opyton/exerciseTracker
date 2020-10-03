import React, { useState } from "react";
import Header from "./partials/Header";
import Axios from "axios";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import sort from "fast-sort";
import { Container, Table } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

const url = "http://localhost:4000/lifts";

const DisplayLifts = () => {
  const [liftData, setLiftData] = useState([]);
  const [modifyData, setmodifyData] = useState("All");
  const [modifyUser, setmodifyUser] = useState("All");
  const [loaded, setLoaded] = useState(false);

  const history = useHistory();

  const DeleteLift = (id) => {
    Axios.delete(url + "/" + id, { withCredentials: true });
    window.location.reload();
  };

  if (loaded === false) {
    Axios.get(url, { withCredentials: true }).then((res) => {
      setLiftData(sort(res.data).desc((u) => u.date));
      setLoaded(true);
    });
    GetUsers();
  } else {
    return (
      <>
        <h1>History</h1>

        <Container>
          <button onClick={() => setmodifyData("All")}>All</button>
          <button onClick={() => setmodifyData("Squat")}>Squat</button>
          <button onClick={() => setmodifyData("Bench")}>Bench</button>
          <button onClick={() => setmodifyData("Deadlift")}>Deadlift</button>
          <button onClick={() => setmodifyData("Incline_Bench")}>
            Incline Bench
          </button>
        </Container>

        <div>
          <label>User</label>
          <select onChange={(e) => setmodifyUser(e.target.value)}>
            {GetUsersAllDefault()}
          </select>
        </div>

        <Table responsive>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Lift</th>
              <th scope="col">Weight</th>
              <th scope="col">Reps</th>
              <th scope="col">Sets</th>
              <th scope="col">Total</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {modifyData === "All" && modifyUser === "All"
              ? liftData.map((lift) => (
                  <tr>
                    <td>{lift.user}</td>
                    <td>{lift.type}</td>
                    <td>{lift.lift_amount}</td>
                    <td>{lift.reps}</td>
                    <td>{lift.sets}</td>
                    <td>{lift.total}</td>
                    <td>
                      {new Date(lift.date).getMonth() + 1}
                      {"/"}
                      {new Date(lift.date).getDate()}
                      {"/"}
                      {new Date(lift.date).getFullYear()}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          history.push("/Edits/" + lift._id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={() => DeleteLift(lift._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : modifyData === "All" && modifyUser !== "All"
              ? liftData
                  .filter((lift) => lift.user === modifyUser)
                  .map((lift) => (
                    <tr>
                      <td>{lift.user}</td>
                      <td>{lift.type}</td>
                      <td>{lift.lift_amount}</td>
                      <td>{lift.reps}</td>
                      <td>{lift.sets}</td>
                      <td>{lift.total}</td>
                      <td>
                        {new Date(lift.date).getMonth() + 1}
                        {"/"}
                        {new Date(lift.date).getDate()}
                        {"/"}
                        {new Date(lift.date).getFullYear()}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            history.push("/Edits/" + lift._id);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button onClick={() => DeleteLift(lift._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              : modifyData !== "All" && modifyUser === "All"
              ? liftData
                  .filter((lift) => lift.type === modifyData)
                  .map((lift) => (
                    <tr>
                      <td>{lift.user}</td>
                      <td>{lift.type}</td>
                      <td>{lift.lift_amount}</td>
                      <td>{lift.reps}</td>
                      <td>{lift.sets}</td>
                      <td>{lift.total}</td>
                      <td>
                        {new Date(lift.date).getMonth() + 1}
                        {"/"}
                        {new Date(lift.date).getDate()}
                        {"/"}
                        {new Date(lift.date).getFullYear()}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            history.push("/Edits/" + lift._id);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button onClick={() => DeleteLift(lift._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              : liftData
                  .filter((lift) => lift.type === modifyData)
                  .filter((lift) => lift.user === modifyUser)
                  .map((lift) => (
                    <tr>
                      <td>{lift.user}</td>
                      <td>{lift.type}</td>
                      <td>{lift.lift_amount}</td>
                      <td>{lift.reps}</td>
                      <td>{lift.sets}</td>
                      <td>{lift.total}</td>
                      <td>
                        {new Date(lift.date).getMonth() + 1}
                        {"/"}
                        {new Date(lift.date).getDate()}
                        {"/"}
                        {new Date(lift.date).getFullYear()}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            history.push("/Edits/" + lift._id);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button onClick={() => DeleteLift(lift._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
          </tbody>
        </Table>
      </>
    );
  }
  return <div>Error Loading Data</div>;
};

const GetUsersAllDefault = () => {
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
        <option value={"All"}>All</option>
        {unique.map((user) => (
          <option value={user}>{user}</option>
        ))}
      </>
    );
  }
  return <div>Error Loading Data</div>;
};

const GetUsers = () => {
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
  return <div>Error Loading Data</div>;
};

const PostLift = () => {
  const [user, setUser] = useState("");
  const [type, setType] = useState("");
  const [number, setNumber] = useState();
  const [reps, setReps] = useState();
  const [sets, setSets] = useState();
  const [startDate, setStartDate] = useState(Date.now());

  const allLifts = ["Bench", "Incline_Bench", "Squat", "Deadlift"];

  return (
    <>
      <h1>Submit new Data</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          Axios.post(
            url,
            {
              type: type,
              user: user,
              lift_amount: number,
              reps: reps,
              sets: sets,
              date: startDate,
            },
            { withCredentials: true }
          );
          window.location.reload();
        }}
      >
        <label>User</label>
        <select onChange={(e) => setUser(e.target.value)}>{GetUsers()}</select>
        <label>Lift Type</label>
        <select onChange={(e) => setType(e.target.value)}>
          <option />
          {allLifts.map((lift) => (
            <option key={lift} value={lift}>
              {lift}
            </option>
          ))}
        </select>
        <label>Amount</label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        ></input>
        <label>Reps</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        ></input>{" "}
        <label>Sets</label>
        <input
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        ></input>
        <label>Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <input type="submit" value="submit"></input>
      </form>
    </>
  );
};

const lifts = () => {
  return (
    <>
      <Header />
      {PostLift()}
      {DisplayLifts()}
    </>
  );
};

export default lifts;
