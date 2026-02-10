import { Container } from "react-bootstrap";
import TasksListing from "../CardListing";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import TaskHeader from "../Task_Header";

const Workpage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, Setloading] = useState(false);

  async function Getdata() {
    try {
      Setloading(true);
      let res = await fetch(
         "http://localhost:3300/api/v1/createCard/category/68b8261b36595f31177724f4"
      );
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      let data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log("Error:", err.message);
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
            Loading... 
            {/* <FontAwesomeIcon icon={faSpinner} spin /> */}
          </div>
        ) : (
          <TasksListing tasks={tasks} />
        )}
      </Container>
    </>
  );
};

export default Workpage;
