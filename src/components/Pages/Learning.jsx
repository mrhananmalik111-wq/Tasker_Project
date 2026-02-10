import { Container } from "react-bootstrap";
import TasksListing from "../CardListing";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskHeader from "../Task_Header";

const Learningpage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, Setloading] = useState(false);
  async function Getdata() {
    try {
      Setloading(true);
      let res = await fetch(
        "http://localhost:3300/api/v1/createCard/category/68b8264e36595f31177724f8"
      );
      let data = await res.json();
      setTasks(data);
    } catch (err) {
      // console.log({ message: err.message });
      console.log(err.message);
    } finally {
      Setloading(false);
    }
  }

  useEffect(() => {
    Getdata();
  }, []);

  return (
    <>
      <TaskHeader total={tasks?.length} />
      <Container fluid>
        {loading ? (
          <div
            style={{ justifyContent: "center", textAlign: "center" }}
            className="mt-5 mb-3"
          >
            {/* Loading.... <FontAwesomeIcon icon={["fas", "spinner"]} spin /> */}
          </div>
        ) : (
          <TasksListing tasks={tasks} />
        )}
      </Container>
    </>
  );
};

export default Learningpage;
