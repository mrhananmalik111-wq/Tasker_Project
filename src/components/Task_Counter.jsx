import TaskHeader from "./TaskHeader";
import { useState } from "react";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);

  return (
    <div>
      <TaskHeader title="My Tasks" total={tasks.length} />
 
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>

      <button onClick={() => setTasks([...tasks, "New Task"])}>Add Task</button>
    </div>
  );
}
