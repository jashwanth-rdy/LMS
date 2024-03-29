import React from "react";
import { Link } from "react-router-dom";
import "../../assets/Instructor.css";
import img3 from "../../assets/img3.jpeg";

function Ihome() {
  return (
    <>
      <img src={img3} width="1580px" alt="Teacher" />
      <div className="teachwithus">
        <b>Come teach with us</b>
        <p>Become an instructor and change lives — including your own.</p>
        <Link
          to="/inst/signup"
          style={{
            borderRadius: "0",
            paddingRight: "90px",
            paddingLeft: "90px",
          }}
          className="btn btn-lg mt-2 btn-dark"
        >
          Get Started
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <p style={{ textAlign: "center" }}>
          <b style={{ fontSize: "38px" }}>Become an instructor today</b>
          <br />
          <p style={{ fontSize: "23px" }}>
            Join one of the world’s largest online learning
            <br />
            marketplaces.
          </p>
          <Link
            to="/inst/signup"
            style={{ borderRadius: "0" }}
            className="btn btn-lg px-5 btn-outline-dark"
          >
            SignUp
          </Link>
        </p>
      </div>
    </>
  );
}

export default Ihome;
