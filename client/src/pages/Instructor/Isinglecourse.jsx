import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./instructor.module.scss";

function Isinglecourse(props) {
  const axiosPrivate = useAxiosPrivate("inst");
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [sections, setSections] = useState();
  const [lectures, setLectures] = useState();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSingleCourse = async () => {
      try {
        const response = await axiosPrivate.get(`/inst/courses/${id}`, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setCourse(response.data.course);
        isMounted && setSections(response.data.sections);
        isMounted && setLectures(response.data.lectures);

        // isMounted && setName(response.data.name);
      } catch (err) {
        console.error(err);
        // navigate("/inst/login", {
        //   state: { from: location },
        //   replace: true,
        // });
      }
    };

    getSingleCourse();
  }, []);
  return (
    <div className="container mt-2">
      <h2>{course?.title}</h2>
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
          <ul>
            {sections.map((ele, id) => (
              <li>{ele.name}</li>
            ))}
          </ul>
        ) : (
          <p>No Sections to display</p>
        )}
      </div>
    </div>
  );
}

export default Isinglecourse;
