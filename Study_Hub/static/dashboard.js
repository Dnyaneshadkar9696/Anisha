// ========== DASHBOARD JS ==========

// Get current user
function getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return null;
    }
    // Prevent admin from accessing student dashboard
    if (currentUser.role === 'admin') {
        window.location.href = 'admin.html';
        return null;
    }
    return currentUser;
}

// Load dashboard
function loadDashboard() {
    const user = getCurrentUser();
    if (!user) return;

    // Set user name
    document.getElementById('userName').textContent = user.fullname.split(' ')[0];

    // Update stats
    const subjects = user.subjects || [];
    document.getElementById('subjectsCount').textContent = subjects.length;
    document.getElementById('studyHours').textContent = user.studyHours || 0;
    document.getElementById('testsCompleted').textContent = user.testsCompleted || 0;
    document.getElementById('overallProgress').textContent = calculateProgress(user);

    // Load selected subjects
    loadSubjects(subjects);

    // Load news updates
    loadNewsUpdates();

    // Load available lectures
    loadAvailableLectures();

    // Update user in localStorage to persist changes
    updateUserData(user);
}

// Load selected subjects
function loadSubjects(subjects) {
    const subjectsList = document.getElementById('subjectsList');
    
    if (!subjects || subjects.length === 0) {
        subjectsList.innerHTML = '<p class="no-data">No subjects selected yet</p>';
        return;
    }

    const subjectIcons = {
        'Quantitative Ability': '🔢',
        'Logical Reasoning': '🧩',
        'Verbal Ability': '📖',
        'Reading Comprehension': '📚'
    };

    subjectsList.innerHTML = subjects.map(subject => `
        <div class="subject-item">
            <div style="font-size: 30px; margin-bottom: 10px;">
                ${subjectIcons[subject] || '📚'}
            </div>
            <strong>${subject}</strong>
            <p style="color: #666; font-size: 12px;">Progress: 0%</p>
        </div>
    `).join('');
}

// Load news updates
function loadNewsUpdates() {
    const news = JSON.parse(localStorage.getItem('news')) || [];
    const newsContainer = document.getElementById('newsUpdates');

    if (news.length === 0) {
        newsContainer.innerHTML = '<p class="no-data">No news updates yet</p>';
        return;
    }

    // Sort by date descending
    news.sort((a, b) => new Date(b.date) - new Date(a.date));

    newsContainer.innerHTML = news.map(item => `
        <div class="news-update-card">
            <div class="news-update-header">
                <h3>${item.icon} ${item.title}</h3>
                <span class="news-badge">${item.category}</span>
            </div>
            <p class="news-update-content">${item.content}</p>
            <p class="news-update-date">📅 ${new Date(item.date).toLocaleDateString('en-IN')}</p>
        </div>
    `).join('');
}

// Load available lectures
function loadAvailableLectures() {
    const user = getCurrentUser();
    if (!user) return;

    const lectures = JSON.parse(localStorage.getItem('lectures')) || [];
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    const lecturesContainer = document.getElementById('lecturesGrid');

    // Filter lectures for user's enrolled subjects
    const userSubjectIds = [];
    subjects.forEach(subject => {
        if (user.subjects && user.subjects.includes(subject.name)) {
            userSubjectIds.push(subject.id);
        }
    });

    const availableLectures = lectures.filter(l => userSubjectIds.includes(l.subjectId));

    if (availableLectures.length === 0) {
        lecturesContainer.innerHTML = '<p class="no-data">No lectures available for your subjects</p>';
        return;
    }

    lecturesContainer.innerHTML = availableLectures.map(lecture => {
        const subject = subjects.find(s => s.id === lecture.subjectId);
        return `
            <div class="lecture-card">
                <div class="lecture-header">
                    <h3>${lecture.title}</h3>
                    <span class="lecture-subject">${subject ? subject.name : 'Unknown'}</span>
                </div>
                <p class="lecture-desc">${lecture.description || 'No description'}</p>
                <div class="lecture-meta">
                    <span>⏱️ ${lecture.duration} mins</span>
                </div>
                <a href="${lecture.url}" target="_blank" class="btn-watch-lecture">Watch Now</a>
            </div>
        `;
    }).join('');
}

// Calculate overall progress
function calculateProgress(user) {
    // For new users, all values are 0
    const totalTests = user.testsCompleted || 0;
    const studyHours = user.studyHours || 0;
    
    // Simple progress calculation
    const progress = Math.min(Math.round((studyHours / 50) * 100), 100);
    return progress;
}

// View performance details
function viewPerformance() {
    alert('Your performance details will be available after taking mock tests.');
}

// Update user data in localStorage
function updateUserData(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Also update in users database
    const users = JSON.parse(localStorage.getItem('users'));
    if (users[user.email]) {
        users[user.email] = {
            ...users[user.email],
            enrolledSubjects: user.subjects,
            studyHours: user.studyHours,
            testsCompleted: user.testsCompleted
        };
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
});
