import { Link } from "react-router-dom";
import "../../assets/Home.css";
import img1 from "../../assets/img1.jpeg";
import img7 from "../../assets/img7.png";
import CourseItem from "../../components/CourseItem";
import Instructor from "./Instructor";
import CategoryList from "../../components/CategoryList";
import axios from "../../api/axios";
import { useState, useEffect } from "react";

function Home() {
  const baseURL = import.meta.env.VITE_REACT_API_URL.replace("/api", "");

  const [courses, setCourses] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCourses = async () => {
      try {
        const response = await axios.get("/courses", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setCourses(response.data.courses);
      } catch (err) {
        console.error(err);
        // navigate("/", {
        //   state: { from: location },
        //   replace: true,
        // });
      }
    };

    getCourses();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <div className="container2">
        <img
          // className="center"
          src={img1}
          alt="e-Learning image"
        />
        <div className="top-left">
          <b>A World of Boundless Learning </b>
          <p>Embrace your learning journey from anywhere in the world.</p>
        </div>
      </div>
      <div className="container mb-3">
        <b style={{ fontSize: "25px" }}>Top Courses</b>
      </div>
      <div className="container">
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
                instructor={ele.instructor.name}
                id={ele._id}
              />
            ))}
          </div>
        ) : (
          <p>No courses to display</p>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          to="courses"
          style={{ borderRadius: "0" }}
          className="btn btn-lg mt-2 btn-outline-dark"
        >
          Explore all Courses
        </Link>
      </div>
      <CategoryList />
      <Instructor img={img7} />
    </div>
  );
}

export default Home;
