export default function CategoryItem(props) {
  return (
    <div className="col">
      <div className="card h-100 trnsfrm" style={{ border: "none" }}>
        <img
          style={{ borderRadius: "0" }}
          src={props.img}
          className="card-img-top"
          alt={props.img}
        />
        <div className="card-body">
          <h5 className="card-title">{props.ctitle}</h5>
        </div>
      </div>
    </div>
  );
}
