import { useEffect, useState } from "react";
import './CourseCard.css';

async function loaderCourses() {
    const response = await fetch("https://aeonaxytask.onrender.com/api/courses/page/1");
    const data = await response.json();
    console.log(await data);
}



const CourseCard = ({ course }) => {
    const { id, title, description, instructor, duration, price, level } = course;

    return (
        <div className="course-card">
            <h2 className="title">{title}</h2>
            <p className="description">{description}</p>
            <div className="details">
                <p><strong>Instructor:</strong> {instructor}</p>
                <p><strong>Duration:</strong> {duration}</p>
                <p><strong>Price:</strong> ${price}</p>
                <p><strong>Level:</strong> {level}</p>
            </div>

        </div>
    );
};

function Courses() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch("https://aeonaxytask.onrender.com/api/courses/page/1")
            .then((response) => response.json())
            .then((data) => setCourses(data));
    }
        , []);
    return (
        <div>
            <h1>Courses</h1>
            <div className="courses-container">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}

export default Courses;