import { Container } from "react-bootstrap";
import TasksListing from "../CardListing";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskHeader from "../Task_Header";

const Personalpage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, Setloading] = useState(false);
  async function Getdata() {
    try {
      Setloading(true);
      let res = await fetch(
        "https://tasker-project-backend.vercel.app/api/v1/createCard/category/68b8263136595f31177724f6"
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

export default Personalpage;
