import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./student.module.scss";
import Ssectionitem from "../../components/Ssectionitem";
import { Rating, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ReactPlayer from "react-player";

function Slearn() {
  const axiosPrivate = useAxiosPrivate("stud");
  const baseURL = import.meta.env.VITE_REACT_API_URL.replace("/api", "");
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState();
  const [sections, setSections] = useState();
  const [lectures, setLectures] = useState();
  const [videoURL, setvideoURL] = useState();
  const [rating, setRating] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const controller = new AbortController();

  useEffect(() => {
    let isMounted = true;

    const getSingleCourse = async () => {
      try {
        const response = await axiosPrivate.get(`/stud/courses/${id}/learn`, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setCourse(response.data.course);
        isMounted && setSections(response.data.sections);
        isMounted && setLectures(response.data.lectures);
        isMounted && setRating(response.data.rating);
        isMounted && setLoaded(true);

        // isMounted && setName(response.data.name);
      } catch (err) {
        console.error(err);
        navigate("/stud/login", {
          state: { from: location },
          replace: true,
        });
      }
    };

    getSingleCourse();
    return () => {
      isMounted = false;
      setLoaded(false);
    };
  }, []);

  const handleRating = async (newRating) => {
    try {
      setRating(newRating);
      const response = await axiosPrivate.post(
        `/stud/courses/${id}/rating/edit`,
        {
          rating: newRating,
        }
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {loaded ? (
        <div className="row">
          <div className="col-md-8">
            <ReactPlayer
              url={`${baseURL}/${videoURL}`}
              width="61rem"
              height="500px"
              controls={true}
            />
            <div className="container">
              <div>Rate the course</div>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newRating) => {
                  handleRating(newRating);
                }}
              />
              <Link to={`/stud/courses/${id}/discuss`}>discuss</Link>
            </div>
          </div>

          <div className="col-md-4">
            {/* Display all sections here */}
            {sections?.length ? (
              <>
                {sections.map((ele, id) => (
                  <Ssectionitem
                    key={ele._id}
                    sec={ele}
                    lecs={lectures[id]}
                    course={course}
                    seturl={setvideoURL}
                  />
                ))}
              </>
            ) : (
              <p>No Sections to display</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </>
  );
}

export default Slearn;
