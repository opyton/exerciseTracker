import React, { useState } from "react";
import Header from "./partials/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import sort from "fast-sort";
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine } from "victory";
import Axios from "axios";

const HomePage = () => {
  const url = "http://localhost:4000/lifts";
  const [liftData, setLiftData] = useState([]);
  const [modifyData, setmodifyData] = useState("Squat");
  const [modifyUser, setmodifyUser] = useState();
  const [loaded, setLoaded] = useState(false);
  const [liftType, setLiftType] = useState("lift_amount");

  const modifyingData = (data) => {
    let filtered = [];
    for (var x = 0; x < data.length; x++) {
      if (data[x].type === modifyData && data[x].user === modifyUser)
        filtered.push({ x: data[x].date, y: data[x][liftType] });
    }
    return filtered;
  };

  const GetUsers = () => {
    const unique = [...new Set(liftData.map((lift) => lift.user))];

    return (
      <>
        {unique.map((user) => (
          <option value={user}>{user}</option>
        ))}
      </>
    );
  };

  const DisplayVictoryChart = () => {
    let month = new Array(12);
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    return (
      <Container>
        <VictoryChart>
          <VictoryAxis
            // tickValues={month}
            tickFormat={(x) => ""}
            // tickFormat={(x) => x}
          />
          <VictoryAxis dependentAxis tickFormat={(y) => y} />
          <VictoryLine
            data={modifyingData(liftData)}
            // labels={(datum) => `${month[datum.x.date]}`}
            // labels={({ datum }) => `${month[new Date(datum.x).getMonth()]}`}
            labels={({ datum }) => `${datum.y}`}
            // labelComponent={<VictoryLabel verticalAnchor={"start"} />}
          />
        </VictoryChart>
      </Container>
    );
  };
  if (loaded === false) {
    Axios.get(url, { withCredentials: true }).then((res) => {
      setLiftData(sort(res.data).asc((u) => u.date));
      const unique = [...new Set(liftData.map((lift) => lift.user))];
      if (unique.length > 0) setmodifyUser(unique[0]);
      setLoaded(true);
    });
  } else {
    return (
      <>
        <Header />
        <h1>Dashboard</h1>
        <h2>Lift: {liftType === "lift_amount" ? "Individual" : "Total"}</h2>
        <h2>Type: {modifyData}</h2>
        <div>
          <label>User</label>
          <select onChange={(e) => setmodifyUser(e.target.value)}>
            {GetUsers()}
          </select>
        </div>
        <Container>
          <button onClick={() => setmodifyData("Squat")}>Squat</button>
          <button onClick={() => setmodifyData("Bench")}>Bench</button>
          <button onClick={() => setmodifyData("Deadlift")}>Deadlift</button>
          <button onClick={() => setmodifyData("Incline_Bench")}>
            Incline Bench
          </button>
        </Container>
        <Container>
          <button onClick={() => setLiftType("lift_amount")}>Individual</button>
          <button onClick={() => setLiftType("total")}>Total</button>
        </Container>

        {DisplayVictoryChart()}
      </>
    );
  }
  return <div>loading...</div>;
};

export default HomePage;
