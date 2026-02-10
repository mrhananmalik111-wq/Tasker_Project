import { useState } from "react";
import EditTask from "./EditTask";

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "15px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
  background: "white",
  height: "100%",
  transition: "transform 0.3s ease", // smooth animation
};


const Base_URL = "http://localhost:3300";

const CardItem = ({ task }) => {
  const [show, setShow] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const handleClose = () => setShow(false);
   const handleShow = (task) => {
    setEditTask(task);
    setShow(true);
  };

  const handleDelete = async (id) => {
    let confirm = window.confirm('Are you sure to delete it.');
    if(!confirm) return;
      await fetch(`${Base_URL}/api/v1/createCard/delete/${id}`, {
        method: "DELETE",
      });
    alert('Task Deleted')    
  }

  return (
    <>
    <EditTask show={show} handleClose={handleClose} task={editTask} />
    <div
      style={cardStyle}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} // zoom in
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}   // normal
    >
      <h4>{task.Title}</h4>
      <p>
        <i style={{ color: "orange" }} className="fa-solid fa-calendar-week"></i> {task.DueDate}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <i style={{ color: "grey" }} className="fa-solid fa-clock"></i> {task.DueTime}
      </p>
      <p>{task.Description}</p>

      {/* <p>Category : {task.Category}</p> */}

      <p>
        <i style={{ color: "purple" }} className="fa-solid fa-signal"></i> Progress: {task.Progress}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <i style={{ color: "green" }} className="fa-solid fa-battery-empty"></i> Status: {task.Status?.name}
      </p>
      <div style={{
        
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <i
            style={{ color: "blue" }}
           onClick={() => handleShow(task)}
            className="fa-solid fa-pen-to-square">
          </i>&nbsp;
          <i style={{ color: "red" }} onClick={() => handleDelete(task._id)} className="fa-solid fa-trash"></i>
        </div>
        <i className="fa-regular fa-star"></i>
      </div>
    </div>
    </>
  );

};
export default CardItem