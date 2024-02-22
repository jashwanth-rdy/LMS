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
                className="nav-link dropdown-toggle active"
                to="#"
                // role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Development
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    IT & Software
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Finance
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Business
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Marketing
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Design
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Photography
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2 inputWidth"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </li>
          </ul>
          <Link
            className="nav-link active"
            to="instructor"
            style={{ marginRight: "10px" }}
          >
            For Instructor
          </Link>
          <a href="#" className="btn btn-outline-dark bttn">
            Log in
          </a>
          <a href="#" className="btn btn-dark bttn">
            Sign up
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
