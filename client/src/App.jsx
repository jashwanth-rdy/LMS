import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
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
import Inst from "./components/Instructor/Inst";
import Unauthorized from "./components/Unauthorized";
import Stud from "./components/Student/Stud";

const ROLE = {
  Instructor: 0,
  Student: 1,
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />}/>
          <Route path="instructor" element={<Ihome />} />
          <Route path="instructor/signup" element={<IsignUp />} />
          <Route path="instructor/login" element={<Ilogin />} />
          <Route path="courses" element={<Courses />}></Route>
          <Route path="student/login" element={<Slogin />}></Route>
          <Route path="student/signup" element={<Ssignup />}></Route>
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* Instructor Routes */}
          <Route element={<RequireAuth allowedRole={ROLE.Instructor} />}>
            <Route path="/inst" element={<Inst />} />
          </Route>

          {/* Student Routes */}
          <Route element={<RequireAuth allowedRole={ROLE.Student} />}>
            <Route path="/stud" element={<Stud />} />
          </Route>

          {/* Not Found Routes */}
          <Route path="*" element={<NotFound />}></Route>
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
