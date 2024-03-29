import { Link } from "react-router-dom";
import "../../assets/Home.css";
import img1 from "../../assets/img1.jpeg";
import img7 from "../../assets/img7.png";
import CourseList from "../../components/CourseList";
import Instructor from "./Instructor";
import CategoryList from "./CategoryList";

function Home() {
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
      <CourseList />
      <CourseList />
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
