import { useState } from "react";
import styles from "./sectionitem.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link } from "react-router-dom";

function Ssectionitem(props) {
  const baseURL = import.meta.env.VITE_REACT_API_URL.replace("/api", "");

  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleClick = (lec) => {
    props.seturl && props.seturl(lec.file);
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
              <p
                onClick={() => handleClick(lecture)}
                className={styles.lec}
                key={lecture._id}
              >
                {lecture.name}
              </p>
            ))
          ) : (
            <p className={styles.lec}>No Lectures</p>
          )}
        </>
      )}
    </div>
  );
}

export default Ssectionitem;
