import React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

function Slogin() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          marginTop: "30px",
          marginLeft: "400px",
          marginRight: "400px",
          border: "1px solid",
          borderColor: "rgba(0,0,0,.17)",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "50px 30px 40px 30px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <b>Student Login</b>
          </div>
          <br />
          <TextField
            style={{ width: "250px" }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
          />
          <br />

          <TextField
            style={{ width: "250px" }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
          />
          <br />
          <Button variant="contained" type="submit">
            Login
          </Button>
          <div className="mt-2">
            Don't have an account?
            <Link to="/stud/signup">
              <Button variant="text">Signup</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slogin;
