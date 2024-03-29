import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function Icourses() {
  const [courses, setCourses] = useState();
  const axiosPrivate = useAxiosPrivate("inst");
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
      console.log("Cleanup...");
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <article className="container">
      <h2>Courses List</h2>
      {courses?.length ? (
        <ul>
          {courses.map((course, i) => (
            <li key={i}>{course?.title}</li>
          ))}
        </ul>
      ) : (
        <p>No courses to display</p>
      )}
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
    </article>
  );
}

export default Icourses;
