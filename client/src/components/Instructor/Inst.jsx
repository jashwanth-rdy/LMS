import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";

const Inst = () => {
  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{}</span>
        </h4>
        <Link to="courses">My Courses</Link>

        {/* <button onClick={Logout}>LOGOUT</button> */}
      </div>
      <ToastContainer />
    </>
  );
};

export default Inst;
