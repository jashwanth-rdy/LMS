import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";

function Inewsection() {
  const { id } = useParams();
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
      const { data } = await axiosPrivate.post(
        `/inst/courses/${id}/newsection`,
        {
          ...fdata,
        }
      );
      console.log(data);
      const { success, message, section_id } = data;
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
        <p>Add New Section</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label htmlFor="section-name" className="form-label">
              Title
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              id="section-name"
              {...register("name", {
                required: "Name is required",
              })}
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

export default Inewsection;
