import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { ToastContainer, toast } from "react-toastify";

function Navbar() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  // const handleError = (err) =>
  //   toast.error(err, {
  //     position: "top-right",
  //   });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  // console.log(auth);
  const usertype = auth?.role === 0 ? "inst" : "stud";
  const signOut = async () => {
    const { message } = await logout(usertype);
    if (message) {
      handleSuccess(message);
      navigate(`/${usertype}/login`);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {auth?.role === 0 ? (
            <a className="navbar-brand" href="/inst">
              eLearn
            </a>
          ) : auth?.role === 1 ? (
            <a className="navbar-brand" href="/stud">
              eLearn
            </a>
          ) : (
            <a className="navbar-brand" href="/">
              eLearn
            </a>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                {auth?.role === 1 ? (
                  <Link className="nav-link active" to="/stud/courses">
                    Courses
                  </Link>
                ) : auth?.role === 0 ? (
                  <></>
                ) : (
                  <Link className="nav-link active" to="/courses">
                    Courses
                  </Link>
                )}
              </li>
            </ul>
            {!auth.user && (
              <Link
                className="nav-link active"
                to="instructor"
                style={{ marginRight: "10px" }}
              >
                For Instructor
              </Link>
            )}
            {!auth?.user && (
              <Link to="/stud/login" className="btn btn-outline-dark bttn">
                Log in
              </Link>
            )}
            {auth?.role === 0 && (
              <Link
                to="/inst/courses/new"
                className="btn btn-outline-dark bttn"
              >
                New Course
              </Link>
            )}
            {auth?.role === 1 && (
              <Link to="/stud/mycourses" className="btn btn-outline-dark bttn">
                My Courses
              </Link>
            )}
            {auth?.user ? (
              <button className="btn btn-dark bttn" onClick={signOut}>
                Logout
              </button>
            ) : (
              <Link to="/stud/signup" className="btn btn-dark bttn">
                Sign up
              </Link>
            )}
          </div>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
}

export default Navbar;
