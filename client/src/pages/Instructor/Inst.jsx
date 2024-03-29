import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import { ToastContainer, toast } from "react-toastify";
import styles from "./instructor.module.scss";
import CourseItem from "../../components/CourseItem";

const Inst = () => {
  const axiosPrivate = useAxiosPrivate("inst");
  const baseURL = import.meta.env.VITE_REACT_API_URL.replace("/api", "");

  const [name, setName] = useState("");
  const [courses, setCourses] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCourses = async () => {
      try {
        const response = await axiosPrivate.get("/inst/courses", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setCourses(response.data.courses);
        isMounted && setName(response.data.name);
      } catch (err) {
        console.error(err);
        navigate("/inst/login", {
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
        <div className={styles.instHead}>Welcome {name}</div>

        {/* <Link to="courses">My Courses</Link>
          <Link to="courses/new">New Course</Link> */}
        <br />
        {courses?.length ? (
          <div className="row">
            {courses.map((ele, i) => (
              <CourseItem
                key={ele._id}
                img={`${baseURL}/${ele.file}`}
                ctitle={ele.title}
                rating={ele.rating}
                numofratings={ele.numofratings}
                id={ele._id}
              />
            ))}
          </div>
        ) : (
          <p>No courses to display</p>
        )}
      </div>
    </>
  );
};

export default Inst;
