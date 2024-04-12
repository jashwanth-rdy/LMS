import { Rating, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

function CourseItem(props) {
  return (
    <>
      <div className="col-md-3 hvr">
        <div className="card h-100" style={{ border: "none" }}>
          <img
            style={{ height: "180px", borderRadius: "0" }}
            src={props.img}
            className="card-img-top"
            alt={props.img}
          />
          <div className="card-body">
            <h5 className="card-title">{props.ctitle}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {props.instructor}
            </h6>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="text-feedback"
                value={props.rating}
                readOnly
                precision={0.1}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Box>
                {props.rating}({props.numofratings})
              </Box>
            </Box>
            <div>
              {props.enrolled ? (
                <Link
                  className="btn btn-sm btn-outline-dark mt-1"
                  to={`/stud/courses/${props.id}/learn`}
                  style={{ borderRadius: "0" }}
                >
                  Go to Course
                </Link>
              ) : (
                <Link
                  className="btn btn-sm btn-outline-dark mt-1"
                  to={`courses/${props.id}`}
                  style={{ borderRadius: "0" }}
                >
                  View Course
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseItem;
