import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import { ToastContainer, toast } from "react-toastify";
import styles from "./student.module.scss";
import CourseItem from "../../components/CourseItem";

function Smycourses() {
  const axiosPrivate = useAxiosPrivate("stud");
  const baseURL = import.meta.env.VITE_REACT_API_URL.replace("/api", "");

  const [courses, setCourses] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCourses = async () => {
      try {
        const response = await axiosPrivate.get("/stud/mycourses", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setCourses(response.data.courses);
      } catch (err) {
        console.error(err);
        navigate("/stud/login", {
          state: { from: location },
          replace: true,
        });
      }
    };

    getCourses();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className={styles.mycourseHead}>My Courses</div>
        <br />
        {courses?.length ? (
          <div className="row">
            {courses.map((ele, i) => (
              <CourseItem
                key={ele.course._id}
                img={`${baseURL}/${ele.course.file}`}
                ctitle={ele.course.title}
                rating={ele.course.rating}
                numofratings={ele.course.numofratings}
                id={ele.course._id}
                enrolled={true}
              />
            ))}
          </div>
        ) : (
          <p>No courses Enrolled</p>
        )}
      </div>
    </>
  );
}

export default Smycourses;
