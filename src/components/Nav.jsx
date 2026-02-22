import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Car from "../assets/Car.jpg";
// import { Work , Personal ,Learning } from "./Routing";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import Signup from "./Signup";
import Login from "./Login";
import { useState, useEffect } from "react";
import AddTask from '../components/AddTask'
import CardItem from "./Card";
// import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


export default function AppNavbar() {
  const [show, setShow] = useState(false);
  // const [totalTasks, setTotalTasks] = useState(0);


  const [editTask, setEditTask] = useState(null);

  const [tasks, setTasks] = useState([]);

  const handleEdit = (task) => {
    setEditTask(task);    // pura task state me daal diya
    setShow(true);        // modal open
  };

  const getTasks = async () => {
    try {
      const res = await fetch("https://tasker-project-backend.vercel.app/api/v1/tasks/get");
      if (!res.ok) {
        console.error("Failed to fetch tasks");
      }
      const data = await res.json();
      console.log(data)
      setTasks(data);
      // setTotalTasks(data.length);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };


  useEffect(() => {
    getTasks();
  }, [])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <AddTask show={show} handleClose={handleClose}
        editTask={editTask} />
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="/EVSLogo.png" width="120" height="70" alt="EVS Logo" />

          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="fa-solid fa-bars-staggered"></i> All Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link to="work" className="nav-link" href="#">
                  <i className="fa-solid fa-file-circle-check"></i> Work
                </Link>
              </li>
              <li className="nav-item">
                <Link to="personal" className="nav-link" href="#">
                  <i className="fa-solid fa-user-tie"></i> Personal
                </Link>
              </li>
              <li className="nav-item">
                <Link to="learning" className="nav-link" href="#">
                  <i className="fa-solid fa-book-open-reader"></i> Learning
                </Link>
              </li>
            </ul>

            {/* <div style={{ padding: "10px" }}>
              <Signup />
            </div>
            <div style={{ padding: "10px" }}>

              <Login />
            </div> */}
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-primary" onClick={handleShow}>
                Add Task <i className="fa-solid fa-user-plus"></i>
              </button>
              <img
                src={Car}
                className="rounded-circle"
                width="40"
                height="40"
                alt="Car"
              />
            </div>
          </div>
        </div>
      </nav>
      {tasks.map((task) => (
        <CardItem key={task._id} task={task} onEdit={() => handleEdit(task)} />
      ))}
    </>
  );
}
