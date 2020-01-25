import React from 'react'
import Course from './Course'

const Courses = ({courses}) => {
    const coursesList = courses.map((course) => <Course course={course}/>);

    return (
        <div>
            {coursesList}
        </div>
    )
};

export default Courses
