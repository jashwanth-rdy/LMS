import React from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function SsignUp() {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data.name);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          margin: "30px 400px 0px 400px",
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
            <b>Student SignUp</b>
          </div>
          <br />
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2} width={250}>
              <TextField
                label="Name"
                variant="outlined"
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
                    message:
                      "Password should be min 8 characters length with atleast one lowercase, uppercase,digit and special character.",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button variant="contained" type="submit">
                SignUp
              </Button>
            </Stack>
          </form>
          <div className="mt-2">
            Already have an account?
            <Link to="/stu/login">
              <Button variant="text">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SsignUp;
