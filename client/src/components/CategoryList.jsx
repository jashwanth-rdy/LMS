import CategoryItem from "./CategoryItem";
import img8 from "../assets/img8.jpeg";
import img9 from "../assets/img9.jpeg";
import img10 from "../assets/img10.jpeg";
import img11 from "../assets/img11.jpeg";

export default function CategoryList() {
  return (
    <>
      <div className="container mt-5 mr-0 ml-0 mb-4">
        <p style={{ marginBottom: "30px", fontSize: "25px" }}>
          <b>Top Categories</b>
        </p>
        <div className="row">
          <CategoryItem img={img8} ctitle="Development" />
          <CategoryItem img={img9} ctitle="Marketing" />
          <CategoryItem img={img10} ctitle="IT & Software" />
          <CategoryItem img={img11} ctitle="Photography" />
        </div>
      </div>
    </>
  );
}
