document.addEventListener("DOMContentLoaded", function() {
    // Require login before rendering content
    const user = requireLogin('login.html');
    if (!user) return;

    loadCourses();
});

function loadCourses() {

    fetch("GetCoursesServlet")
    .then(response => response.json())
    .then(data => {

        const grid = document.getElementById("coursesGrid");

        grid.innerHTML = ""; // remove "Loading courses..."
        let html = "";

        data.forEach(course => {
            html += `
                <div class="course-card">
                    <div class="course-header">
                        <h3>${course.name}</h3>
                    </div>
                    <div class="course-body">
                        <p><strong>Duration:</strong> ${course.duration}</p>
                        <p><strong>Price:</strong> ₹${course.price}</p>
                    </div>
                    <div class="course-footer">
                        <button class="btn-select-course" onclick="selectCourse('${course.id}')">
                            Select Course
                        </button>
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;

    })
    .catch(error => console.error("Error loading courses:", error));
}

function selectCourse(courseId){

fetch("SelectCourseServlet",{
method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},
body:"course_id="+courseId
})
.then(response=>response.text())
.then(data=>{
alert("Course enrolled successfully!");
})
.catch(error=>{
console.error("Error:",error);
});

}