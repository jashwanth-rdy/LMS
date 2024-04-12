import { useState } from "react";
import styles from "./sectionitem.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

function Sectionitem(props) {
  const baseURL = import.meta.env.VITE_REACT_API_URL.replace("/api", "");

  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className={styles.sec} onClick={toggleExpand}>
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        {props.sec.name}
      </div>
      {expanded && (
        <>
          {props.lecs.length ? (
            props.lecs.map((lecture, idx) => (
              <Link
                className={styles.lec}
                key={lecture._id}
                to={`${baseURL}/${lecture.file}`}
              >
                {lecture.name}
              </Link>
            ))
          ) : (
            <p className={styles.lec}>No Lectures</p>
          )}
          <Link
            to={`/inst/courses/${props.course?._id}/sections/${props.sec?._id}/lectures/new`}
            className={styles.lec}
          >
            Add New Lecture
          </Link>
        </>
      )}
      
    </div>
  );
}

export default Sectionitem;
