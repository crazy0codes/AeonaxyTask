async function loaderCourses() {
    const response = await fetch("https://aeonaxytask.onrender.com/api/courses/page/1");
    const data = await response.json();
    console.log(await data);
}

loaderCourses();

function Courses() {
  return (
    <div>
      <h1>Courses</h1>
    </div>
  );
}

export default Courses;