import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Instructor from "./components/Home/Instructor";
import Courses from "./components/Courses";
import NotFound from "./components/NotFound";
import Ihome from "./components/Home/Ihome";
import IsignUp from "./components/Instructor/IsignUp";
import Ilogin from "./components/Instructor/Ilogin";
import Slogin from "./components/Student/Slogin";
import Ssignup from "./components/Student/Ssignup";
import Inst from "./components/Instructor/Inst";
import Unauthorized from "./components/Unauthorized";
import Stud from "./components/Student/Stud";
import Icourses from "./components/Instructor/Icourses";
import PersistLogin from "./components/PersistLogin";

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
        <Route path="/" element={<Home />} />
        <Route path="instructor" element={<Ihome />} />
        <Route path="inst/signup" element={<IsignUp />} />
        <Route path="inst/login" element={<Ilogin />} />
        <Route path="courses" element={<Courses />}></Route>
        <Route path="stud/login" element={<Slogin />}></Route>
        <Route path="stud/signup" element={<Ssignup />}></Route>
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Instructor Routes */}
        <Route element={<PersistLogin usertype={"inst"} />}>
          <Route element={<RequireAuth allowedRole={ROLE.Instructor} />}>
            <Route path="/inst" element={<Inst />} />
            <Route path="/inst/courses" element={<Icourses />} />
          </Route>

          {/* Student Routes */}
          <Route element={<RequireAuth allowedRole={ROLE.Student} />}>
            <Route path="/stud" element={<Stud />} />
          </Route>
        </Route>

        {/* Not Found Routes */}
        <Route path="*" element={<NotFound />}></Route>
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
