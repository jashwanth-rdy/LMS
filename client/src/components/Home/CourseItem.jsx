import { Rating } from "@mui/material";

function CourseItem(props) {
  return (
    <>
      <div className="col hvr">
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
            <div>
              <Rating
                name="half-rating-read"
                defaultValue={2.5}
                precision={0.1}
                readOnly
              />
            </div>

            <a
              className="btn btn-sm btn-outline-dark"
              href={props.link}
              style={{ borderRadius: "0" }}
            >
              View Course
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseItem;
