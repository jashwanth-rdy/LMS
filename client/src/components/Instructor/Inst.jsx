import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Inst = () => {
  // const navigate = useNavigate();
  // const [cookies, removeCookie] = useCookies([]);
  // const [instname, setInstname] = useState("");
  // useEffect(() => {
  //   const verifyCookie = async () => {
  //     if (!cookies.jwt) {
  //       navigate("/instructor/login");
  //     }
  //     const { data } = await axios.post(
  //       "http://localhost:3000/inst",
  //       {},
  //       { withCredentials: true }
  //     );
  //     const { status, inst } = data;
  //     setInstname(inst);
  //     return status
  //       ? true : (removeCookie("jwt"), navigate("/instructor/login"));
  //   };
  //   verifyCookie();
  // }, [cookies, navigate, removeCookie]);
    const Logout = async () => {
    const { data } = await axios.post(
        "http://localhost:3000/inst/logout",
        {},
        { withCredentials: true }
    );
    removeCookie("jwt");
    navigate("/instructor/login");
  };
  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Inst;
