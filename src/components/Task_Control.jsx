import "bootstrap/dist/css/bootstrap.min.css";
// import { useState } from "react";

export default function TaskControl(props) {
    // const [tasks, setTasks] = useState([]);
  return (
    <div className="d-flex justify-content-between align-items-center bg-white border rounded shadow-sm px-3 py-4">
      
      <div className="d-flex align-items-center">
        <button className="btn btn-link p-0 me-2">
          {/* <span className="navbar-toggler-icon"></span> */}
        </button>
        <h5 style={{color:"rgba(19, 113, 222, 0.93)"}} className="mb-0 fw-semibold fs-4">
          {props.title ? props.title :<> <i className="fa-solid fa-bars-staggered"></i>My Tasks</>}
        </h5>
      </div> 

      <div className="d-flex align-items-center">
        <span className="me-3 text-secondary small fs-5">
          Total:{" "}
          <span className="fw-bold text-dark fs-5">
            {/* {tasks.length} */} Tasks
          </span>
        </span>
      </div>
    </div>
  );
}
