import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          eLearn
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* <span className="navbar-toggler-icon" /> */}
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li> */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link active"
                to="courses"
                // role="button"
              >
                Courses
              </Link>
            </li>
            {/* <li>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2 inputWidth"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </li> */}
          </ul>
          <Link
            className="nav-link active"
            to="instructor"
            style={{ marginRight: "10px" }}
          >
            For Instructor
          </Link>
          <Link to="student/login" className="btn btn-outline-dark bttn">
            Log in
          </Link>
          <Link to="student/signup" className="btn btn-dark bttn">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
