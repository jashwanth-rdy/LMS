import CourseItem from "./CourseItem";
import img4 from "../assets/img4.jpg";
import img12 from "../assets/img12.jpg";
import img13 from "../assets/img13.jpg";
import img14 from "../assets/img14.jpg";

function CourseList() {
  return (
    <div className="container mr-0 ml-0 mb-4">
      <div className="row">
        <CourseItem
          img={img4}
          ctitle="Web Development Bootcamp"
          instructor="Angela Joe"
        />
        <CourseItem
          img={img12}
          ctitle="Python Bootcamp"
          instructor="Colt steele"
        />
        <CourseItem
          img={img13}
          ctitle="Machine Learning A-Z"
          instructor="Andrew Ng"
        />
        <CourseItem
          img={img14}
          ctitle="Photography"
          instructor="Joel Jhonson"
        />
      </div>
    </div>
  );
}

export default CourseList;
