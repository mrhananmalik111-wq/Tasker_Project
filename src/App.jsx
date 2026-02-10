// import MyButton from "./components/Button";
import AppNavbar from "./components/Nav";
import TaskControl from "./components/Task_Control";
import DataHandler from "./components/Fetch_Data";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";   // ✅ FIXED
import AllTasks from "./components/Pages/All_task";
import Learningpage from "./components/Pages/Learning";
import Workpage from "./components/Pages/Work";
import Personalpage from "./components/Pages/Personal";
// import UploadProfile from "./components/j";

function App() {
  // const base_url = 'http://localhost:3300';
  return (
    <>
      <BrowserRouter>
        <AppNavbar />
    {/* <img src="http://localhost:3300/uploads/1758111415939.jpg" alt="" /> */}
    {/* <img src=`${base_url}${data.image}` alt="" /> */}
        <Routes>
          <Route path="/" element={<AllTasks />} />
          <Route path="/learning" element={<Learningpage />} />
          <Route path="/work" element={<Workpage />} />
          <Route path="/personal" element={<Personalpage />} />
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
