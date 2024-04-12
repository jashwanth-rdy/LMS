import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./student.module.scss";
import Ssectionitem from "../../components/Ssectionitem";
import { Rating, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

function Ssinglecourse() {
  const axiosPrivate = useAxiosPrivate("stud");
  const baseURL = import.meta.env.VITE_REACT_API_URL.replace("/api", "");
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState();
  const [sections, setSections] = useState();
  const [lectures, setLectures] = useState();
  const [enrolled, setEnrolled] = useState();
  const [loaded, setLoaded] = useState(false);

  const controller = new AbortController();

  useEffect(() => {
    let isMounted = true;

    const getSingleCourse = async () => {
      try {
        const response = await axiosPrivate.get(`/stud/courses/${id}`, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setCourse(response.data.course);
        isMounted && setSections(response.data.sections);
        isMounted && setLectures(response.data.lectures);
        isMounted && setEnrolled(response.data.enrolled);
        isMounted && setLoaded(true);

        // isMounted && setName(response.data.name);
      } catch (err) {
        console.error(err);
        // navigate("/stud/login", {
        //   state: { from: location },
        //   replace: true,
        // });
      }
    };

    getSingleCourse();
  }, []);

  const handleEnroll = async () => {
    try {
      const response = await axiosPrivate.post(`/stud/courses/${id}/enroll`, {
        signal: controller.signal,
      });
      console.log(response.data);
      if (response.data.success) {
        navigate("/stud/mycourses", { replace: true });
      } else {
        navigate("/stud/login", {
          replace: true,
        });
      }
    } catch (err) {
      console.error(err);
      navigate("/stud/login", {
        replace: true,
      });
    }
  };

  return (
    <>
      {loaded ? (
        <div className="container">
          <div className="mt-3 row">
            <div className="col-md-8">
              <div>
                <h2>{course?.title}</h2>

                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <Rating
                    name="text-feedback"
                    value={course?.rating}
                    readOnly
                    precision={0.1}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Box>
                    {course?.rating}({course?.numofratings})
                  </Box>
                </Box>
                <div className={styles.categorycontainer}>
                  <p className={styles.categorylabel}>Instructor :</p>
                  <h5 className={styles.categoryvalue}>
                    {course?.instructor.name}
                  </h5>
                </div>
                <div className={styles.categorycontainer}>
                  <p className={styles.categorylabel}>Category :</p>
                  <h5 className={styles.categoryvalue}>{course?.category}</h5>
                </div>
                <div className="mt-2">
                  <h5>Description</h5>
                  <p>{course?.description}</p>
                </div>
                <div className="mt-2">
                  <h5>Pre-Requisites</h5>
                  <p>{course?.requirements}</p>
                </div>
                <div className="mt-2">
                  <h5>Course Content</h5>
                  {sections?.length ? (
                    <>
                      {sections.map((ele, id) => (
                        <Ssectionitem
                          key={ele._id}
                          sec={ele}
                          lecs={lectures[id]}
                          course={course}
                        />
                      ))}
                    </>
                  ) : (
                    <p>No Sections to display</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="mt-5 px-4 py-3"
                style={{
                  position: "fixed",
                  display: "inline-block",
                  //   border: "1px solid",
                }}
              >
                <img
                  src={`${baseURL}/${course?.file}`}
                  alt="Preview"
                  width="300px"
                  height="180px"
                />
                {enrolled ? (
                  <Link
                    className="btn btn-lg btn-outline-dark mt-2 py-2 px-5 mx-5"
                    to={`/stud/courses/${id}/learn`}
                  >
                    Go to Course
                  </Link>
                ) : (
                  <button
                    className="btn btn-lg btn-outline-dark mt-2 py-2 px-5 mx-5"
                    onClick={handleEnroll}
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default Ssinglecourse;
