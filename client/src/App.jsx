import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Instructor from "./components/Home/Instructor";
import Courses from "./components/Courses";
import NotFound from "./components/NotFound";
import Ihome from "./components/Instructor/Ihome";
import IsignUp from "./components/Instructor/IsignUp";
import Ilogin from "./components/Instructor/Ilogin";
import Slogin from "./components/Student/Slogin";
import Ssignup from "./components/Student/Ssignup";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="instructor" element={<Ihome />}/>
        <Route path="instructor/signup" element={<IsignUp />}/>
        <Route path="instructor/login" element={<Ilogin />}/>
        <Route path="courses" element={<Courses />}></Route>
        <Route path="student/login" element={<Slogin />}></Route>
        <Route path="student/signup" element={<Ssignup />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
