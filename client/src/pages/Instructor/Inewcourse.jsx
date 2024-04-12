import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import styles from "./instructor.module.scss";

function Inewcourse() {
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

      formData.append("title", fdata.title);
      formData.append("description", fdata.description);
      formData.append("requirements", fdata.requirements);
      formData.append("category", fdata.category);

      const { data } = await axiosPrivate.post("/inst/newcourse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { success, message, course_id } = data;
      if (success) {
        handleSuccess(message);
        reset();
        setTimeout(() => {
          navigate(`/inst/courses/${course_id}`);
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
        <p className={styles.instHead}>Add New Course</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label htmlFor="course-title" className="form-label">
              Title
            </label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="course-title"
              {...register("title", {
                required: "Title is required",
              })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="course-category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="course-category"
              class="form-select"
              aria-label="Default select example"
              {...register("category", {
                required: "Category is required",
              })}
            >
              <option selected value="oth">
                Others
              </option>
              <option value="dev">Development</option>
              <option value="bus">Business</option>
              <option value="des">Design</option>
              <option value="mar">Marketing</option>
              <option value="hnf">Health & Fitness</option>
              <option value="its">IT & Software</option>
              <option value="pho">Photography</option>
              <option value="mus">Music</option>
              <option value="fna">Finance & Accounting</option>
              <option value="lif">Lifestyle</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="course-description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              id="course-description"
              rows="5"
              {...register("description", {
                required: "Description is required",
              })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="course-req" className="form-label">
              Pre-Requisites
            </label>
            <textarea
              name="requirements"
              className="form-control"
              id="course-req"
              rows="3"
              {...register("requirements", {
                required: "Pre-Requisites are required",
              })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="course-thumbnail" className="form-label">
              Thumbnail
            </label>
            <input
              className="form-control"
              type="file"
              accept=".jpg,.jpeg,.png"
              id="course-thumbnail"
              {...register("file", {
                required: "Thumbnail is required",
              })}
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Inewcourse;
