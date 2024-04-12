import React from "react";
import { TextField, Button, Stack } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";

function Inewlecture() {
  const { id1, id2 } = useParams();
  const axiosPrivate = useAxiosPrivate("inst");
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;

  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const onSubmit = async (fdata) => {
    console.log(fdata);
    try {
      const formData = new FormData();
      formData.append("file", fdata.file[0]); // Access file from the submitted data

      // You can also send other form data here if needed
      formData.append("name", fdata.name);

      const { data } = await axiosPrivate.post(
        `/inst/courses/${id1}/sections/${id2}/newlecture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        reset();
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  };
  return (
    <>
      <div className="container">
        <p>Add New Lecture</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label htmlFor="section-name" className="form-label">
              Lecture
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              id="lecture-name"
              {...register("name", {
                required: "Name is required",
              })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lecture-file" className="form-label">
              Video
            </label>
            <input
              className="form-control"
              type="file"
              accept=".mp4"
              id="lecture-file"
              {...register("file")}
            />
          </div>
          <button type="submit" className="btn btn-info">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Inewlecture;
