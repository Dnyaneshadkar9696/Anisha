document.addEventListener("DOMContentLoaded", loadCourses);
function loadCourses(){
fetch("GetCoursesServlet")
.then(response => response.json())
.then(data => {

const grid = document.getElementById("coursesGrid");

let html="";

data.forEach(course => {

html+=`

<div class="course-card">

<h3>${course.name}</h3>

<p>Duration: ${course.duration}</p>

<p>Price: ₹${course.price}</p>

<button onclick="selectCourse('${course.id}')">
Select Course
</button>

</div>

`;

});

grid.innerHTML = html;

});

}

function selectCourse(courseId){

alert("Course selected: "+courseId);

}