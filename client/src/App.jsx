import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Courses from "./components/Courses";
import NotFound from "./components/NotFound";
import Ihome from "./pages/Home/Ihome";
import IsignUp from "./pages/Instructor/IsignUp";
import Ilogin from "./pages/Instructor/Ilogin";
import Slogin from "./pages/Student/Slogin";
import Ssignup from "./pages/Student/Ssignup";
import Inst from "./pages/Instructor/Inst";
import Unauthorized from "./components/Unauthorized";
import Stud from "./pages/Student/Stud";
import Icourses from "./pages/Instructor/Icourses";
import PersistLogin from "./components/PersistLogin";
import Inewcourse from "./pages/Instructor/Inewcourse";
import Inewsection from "./pages/Instructor/Inewsection";
import Inewlecture from "./pages/Instructor/Inewlecture";
import Isinglecourse from "./pages/Instructor/Isinglecourse";

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
            <Route path="/inst/courses/:id" element={<Isinglecourse />} />
            <Route path="/inst/courses/new" element={<Inewcourse />} />
            <Route
              path="/inst/courses/:id/sections/new"
              element={<Inewsection />}
            />
            <Route
              path="/inst/courses/:id1/sections/:id2/lectures/new"
              element={<Inewlecture />}
            />
          </Route>
        </Route>

        {/* Student Routes */}
        <Route element={<PersistLogin usertype={"stud"} />}>
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
