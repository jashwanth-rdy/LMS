import { Link } from "react-router-dom";

export default function Instructor(props) {
  return (
    <div style={{ backgroundColor: "rgba(248,249,251,255)" }}>
      <div
        style={{
          margin: "50px 300px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          style={{ float: "left", height: "400px", marginRight: "50px" }}
          src={props.img}
        />
        <p>
          <b style={{ marginTop: "150px", fontSize: "25px" }}>
            Become an Instructor
          </b>
          <br />
          <br />
          Instructors from around the world teach millions of learners on our
          platform. We provide the tools and skills to teach what you love.
          <br />
          <Link
            to="instructor"
            style={{ borderRadius: "0" }}
            className="btn btn-lg btn-dark mt-4"
          >
            Start teaching today
          </Link>
        </p>
      </div>
    </div>
  );
}
