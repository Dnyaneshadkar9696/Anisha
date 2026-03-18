// ========== DASHBOARD JS ==========

// Get current logged in user
function getCurrentUser() {

    const currentUser = requireLogin('login.html');
    if (!currentUser) return null;

    // Prevent admin from accessing student dashboard
    if (currentUser.role === 'admin') {
        window.location.href = 'admin.html';
        return null;
    }

    return currentUser;
}


// ========== LOAD DASHBOARD ==========
function loadDashboard() {

    const user = getCurrentUser();
    if (!user) return;

    // Set username
    document.getElementById("userName").textContent =
        user.fullname.split(" ")[0];

    // Static stats (from local user object)
    document.getElementById("studyHours").textContent =
        user.studyHours || 0;

    document.getElementById("testsCompleted").textContent =
        user.testsCompleted || 0;

    document.getElementById("overallProgress").textContent =
        calculateProgress(user) + "%";

    // Load courses from database
    loadMyCourses();

    // Load other dashboard sections
    loadNewsUpdates();
    loadAvailableLectures();

    updateUserData(user);
}



// ========== LOAD ENROLLED COURSES ==========
function loadMyCourses() {

    fetch("GetUserCoursesServlet")
        .then(response => response.json())
        .then(data => {

            const subjectsList =
                document.getElementById("subjectsList");

            // Update dashboard stat
            document.getElementById("subjectsCount").textContent =
                data.length;

            if (data.length === 0) {
                subjectsList.innerHTML =
                    '<p class="no-data">No courses enrolled yet</p>';
                return;
            }

            let html = "";

            data.forEach(course => {

                html += `
                <div class="subject-item">
                    <div style="font-size:30px;margin-bottom:10px;">
                        📚
                    </div>
                    <strong>${course.name}</strong>
                    <p style="color:#666;font-size:12px;">
                        Course Enrolled
                    </p>
                </div>
                `;

            });

            subjectsList.innerHTML = html;

        })
        .catch(error =>
            console.error("Error loading courses:", error)
        );
}



// ========== LOAD NEWS ==========
function loadNewsUpdates() {

    const news =
        JSON.parse(localStorage.getItem("news")) || [];

    const newsContainer =
        document.getElementById("newsUpdates");

    if (news.length === 0) {
        newsContainer.innerHTML =
            '<p class="no-data">No news updates yet</p>';
        return;
    }

    news.sort((a, b) =>
        new Date(b.date) - new Date(a.date)
    );

    newsContainer.innerHTML = news.map(item => `
        <div class="news-update-card">
            <div class="news-update-header">
                <h3>${item.icon} ${item.title}</h3>
                <span class="news-badge">${item.category}</span>
            </div>
            <p class="news-update-content">${item.content}</p>
            <p class="news-update-date">
                📅 ${new Date(item.date).toLocaleDateString('en-IN')}
            </p>
        </div>
    `).join("");
}



// ========== LOAD LECTURES ==========
function loadAvailableLectures() {

    const lectures =
        JSON.parse(localStorage.getItem("lectures")) || [];

    const lecturesContainer =
        document.getElementById("lecturesGrid");

    if (lectures.length === 0) {
        lecturesContainer.innerHTML =
            '<p class="no-data">No lectures available yet</p>';
        return;
    }

    lecturesContainer.innerHTML =
        lectures.map(lecture => `
        <div class="lecture-card">
            <div class="lecture-header">
                <h3>${lecture.title}</h3>
                <span class="lecture-subject">
                    ${lecture.subject || "Subject"}
                </span>
            </div>
            <p class="lecture-desc">
                ${lecture.description || "No description"}
            </p>
            <div class="lecture-meta">
                <span>⏱️ ${lecture.duration} mins</span>
            </div>
            <a href="${lecture.url}" target="_blank"
               class="btn-watch-lecture">
               Watch Now
            </a>
        </div>
    `).join("");
}



// ========== CALCULATE PROGRESS ==========
function calculateProgress(user) {

    const studyHours = user.studyHours || 0;

    const progress =
        Math.min(Math.round((studyHours / 50) * 100), 100);

    return progress;
}



// ========== VIEW PERFORMANCE ==========
function viewPerformance() {

    alert(
        "Your performance details will appear after taking mock tests."
    );

}



// ========== UPDATE USER DATA ==========
function updateUserData(user) {

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

}



// ========== INITIALIZE DASHBOARD ==========
document.addEventListener(
    "DOMContentLoaded",
    function () {
        loadDashboard();
    }
);