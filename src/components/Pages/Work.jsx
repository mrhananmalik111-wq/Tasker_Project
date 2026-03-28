import { Container } from "react-bootstrap";
import TasksListing from "../CardListing";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import TaskHeader from "../Task_Header";

const Workpage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, Setloading] = useState(false);

  async function Getdata() {
    try {
      Setloading(true);
      let res = await fetch(
         "https://tasker-project-backend.vercel.app/api/v1/createCard/category/68b8261b36595f31177724f4"
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
   const loaderStyles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "60vh",
    },
    content: {
      textAlign: "center",
    },
    icon: {
      fontSize: "48px",
      color: "#667eea",
      marginBottom: "15px",
    },
    text: {
      fontSize: "18px",
      color: "#666",
      marginTop: "10px",
    },
  };

  return (
    <>
      <TaskHeader total={tasks?.length} />
      <Container fluid>
        {loading ? (
                  <div style={loaderStyles.container}>
                    <div style={loaderStyles.content}>
                      <FontAwesomeIcon icon={faSpinner} spin style={loaderStyles.icon} />
                      <p style={loaderStyles.text}>Loading tasks...</p>
                    </div>
                  </div>
        ) : (
          <TasksListing tasks={tasks} />
        )}
      </Container>
    </>
  );
};

export default Workpage;
