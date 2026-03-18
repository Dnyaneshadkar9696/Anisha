// ========== ADMIN PANEL JS ==========

// Initialize admin data storage
function initializeAdminStorage() {
    if (!localStorage.getItem('subjects')) {
        // Default subjects
        const defaultSubjects = [
            {
                id: 1,
                name: 'Quantitative Ability',
                icon: '🔢',
                description: 'Master mathematics and quantitative reasoning',
                lectureCount: 0
            },
            {
                id: 2,
                name: 'Logical Reasoning',
                icon: '🧠',
                description: 'Develop critical thinking and logical skills',
                lectureCount: 0
            },
            {
                id: 3,
                name: 'Verbal Ability',
                icon: '📚',
                description: 'Improve language and communication skills',
                lectureCount: 0
            },
            {
                id: 4,
                name: 'Reading Comprehension',
                icon: '📖',
                description: 'Enhance reading and understanding skills',
                lectureCount: 0
            }
        ];
        localStorage.setItem('subjects', JSON.stringify(defaultSubjects));
    }

    if (!localStorage.getItem('lectures')) {
        localStorage.setItem('lectures', JSON.stringify([]));
    }

    if (!localStorage.getItem('news')) {
        localStorage.setItem('news', JSON.stringify([]));
    }
}

// Check if user is admin
function checkAdminAccess() {
    const currentUser = requireLogin('login.html');
    if (!currentUser) return false;

    const role = (currentUser.role || '').toString().trim().toLowerCase();
    if (role !== 'admin') {
        showNotification('Access denied. Admin only!', 'error');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        return false;
    }
    return true;
}

// Display admin name
function displayAdminName() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')||"null");
    const adminNameElement = document.getElementById('adminName');
    if (currentUser && adminNameElement) {
        adminNameElement.textContent = currentUser.fullname;
    }
}

// Show specific section
function showSection(sectionName, element) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from menu items
    document.querySelectorAll('.admin-menu-link, .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(sectionName + '-section');
    if (section) {
        section.classList.add('active');
    }

    if (element) {
        element.classList.add('active');
    }

    // Update URL hash so the section can be bookmarked/linked
    if (window.location.pathname.endsWith('admin.html')) {
        window.location.hash = sectionName;
    }

    // Load section-specific data
    if (sectionName === 'dashboard') {
        loadDashboardStats();
    } else if (sectionName === 'subjects') {
        loadSubjectsList();
    } else if (sectionName === 'lectures') {
        loadLecturesList();
    } else if (sectionName === 'news') {
        loadNewsList();
    }
}

// Set the active nav link based on current path/hash
function setActiveNav() {
    const currentPath = window.location.pathname.split('/').pop();
    const currentHash = window.location.hash;

    document.querySelectorAll('.nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (!linkHref) return;

        const [linkPath, linkHash] = linkHref.split('#');

        if (currentPath === linkPath || (currentPath === '' && linkPath === 'admin.html')) {
            if ((!linkHash && !currentHash) || (linkHash && `#${linkHash}` === currentHash)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        } else {
            link.classList.remove('active');
        }
    });
}

// Ensure section is displayed based on URL hash on load
function applyHashSectionOnLoad() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        showSection(hash);
    } else {
        showSection('dashboard');
    }
}

// Update active nav item when hash changes
window.addEventListener('hashchange', () => {
    applyHashSectionOnLoad();
    setActiveNav();
});


// ========== DASHBOARD FUNCTIONS ==========
function loadDashboardStats() {
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    const lectures = JSON.parse(localStorage.getItem('lectures')) || [];
    const news = JSON.parse(localStorage.getItem('news')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || {};

    const studentCount = Object.values(users).filter(u => u.role !== 'admin').length;

    document.getElementById('totalSubjects').textContent = subjects.length;
    document.getElementById('totalLectures').textContent = lectures.length;
    document.getElementById('totalNews').textContent = news.length;
    document.getElementById('totalStudents').textContent = studentCount;
}

// ========== SUBJECTS MANAGEMENT ==========
function openAddSubjectForm() {
    document.getElementById('addSubjectForm').style.display = 'block';
    document.getElementById('subjectForm').reset();
    document.getElementById('formTitle').textContent = 'Add New Subject';
    document.getElementById('subjectForm').dataset.isEdit = 'false';
}

function closeAddSubjectForm() {
    document.getElementById('addSubjectForm').style.display = 'none';
    document.getElementById('subjectForm').reset();
}

function loadSubjectsList() {
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    const lecturesList = JSON.parse(localStorage.getItem('lectures')) || [];
    const tableBody = document.getElementById('subjectsList');

    if (subjects.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" class="no-data">No subjects added yet</td></tr>';
        return;
    }

    tableBody.innerHTML = subjects.map(subject => {
        const lectureCount = lecturesList.filter(l => l.subjectId === subject.id).length;
        return `
            <tr>
                <td>${subject.icon} ${subject.name}</td>
                <td>${subject.description}</td>
                <td>${lectureCount}</td>
                <td>
                    <button class="btn-edit" onclick="editSubject(${subject.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteSubject(${subject.id})">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

function editSubject(id) {
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    const subject = subjects.find(s => s.id === id);

    if (subject) {
        document.getElementById('subjectName').value = subject.name;
        document.getElementById('subjectDesc').value = subject.description;
        document.getElementById('subjectIcon').value = subject.icon;
        document.getElementById('formTitle').textContent = 'Edit Subject';
        document.getElementById('subjectForm').dataset.isEdit = 'true';
        document.getElementById('subjectForm').dataset.editId = id;
        document.getElementById('addSubjectForm').style.display = 'block';
        document.getElementById('subjectForm').scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteSubject(id) {
    if (confirm('Are you sure you want to delete this subject? All associated lectures will also be deleted.')) {
        let subjects = JSON.parse(localStorage.getItem('subjects')) || [];
        let lectures = JSON.parse(localStorage.getItem('lectures')) || [];

        subjects = subjects.filter(s => s.id !== id);
        lectures = lectures.filter(l => l.subjectId !== id);

        localStorage.setItem('subjects', JSON.stringify(subjects));
        localStorage.setItem('lectures', JSON.stringify(lectures));
        loadSubjectsList();
        showNotification('Subject deleted successfully', 'success');
    }
}

// Setup subject form submission
function setupSubjectForm() {
    const form = document.getElementById('subjectForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('subjectName').value.trim();
        const desc = document.getElementById('subjectDesc').value.trim();
        const icon = document.getElementById('subjectIcon').value.trim() || '📚';
        const isEdit = this.dataset.isEdit === 'true';
        const editId = parseInt(this.dataset.editId);

        if (!name || !desc) {
            showNotification('Please fill all required fields', 'error');
            return;
        }

        let subjects = JSON.parse(localStorage.getItem('subjects')) || [];

        if (isEdit) {
            const subjectIndex = subjects.findIndex(s => s.id === editId);
            if (subjectIndex !== -1) {
                subjects[subjectIndex] = {
                    ...subjects[subjectIndex],
                    name: name,
                    description: desc,
                    icon: icon
                };
            }
            showNotification('Subject updated successfully', 'success');
        } else {
            const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
            subjects.push({
                id: newId,
                name: name,
                icon: icon,
                description: desc,
                lectureCount: 0
            });
            showNotification('Subject added successfully', 'success');
        }

        localStorage.setItem('subjects', JSON.stringify(subjects));
        closeAddSubjectForm();
        loadSubjectsList();
        updateLectureSubjectOptions();
    });
}

// ========== LECTURES MANAGEMENT ==========
function updateLectureSubjectOptions() {
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    const select = document.getElementById('lectureSubject');
    select.innerHTML = '<option value="">Select Subject</option>';
    subjects.forEach(subject => {
        select.innerHTML += `<option value="${subject.id}">${subject.name}</option>`;
    });
}

function openAddLectureForm() {
    document.getElementById('addLectureForm').style.display = 'block';
    document.getElementById('lectureForm').reset();
    document.getElementById('lecFormTitle').textContent = 'Add New Lecture';
    document.getElementById('lectureForm').dataset.isEdit = 'false';
    updateLectureSubjectOptions();
}

function closeAddLectureForm() {
    document.getElementById('addLectureForm').style.display = 'none';
    document.getElementById('lectureForm').reset();
}

function loadLecturesList() {
    const lectures = JSON.parse(localStorage.getItem('lectures')) || [];
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    const tableBody = document.getElementById('lecturesList');

    if (lectures.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" class="no-data">No lectures added yet</td></tr>';
        return;
    }

    tableBody.innerHTML = lectures.map(lecture => {
        const subject = subjects.find(s => s.id === lecture.subjectId);
        return `
            <tr>
                <td>${lecture.title}</td>
                <td>${subject ? subject.name : 'Unknown'}</td>
                <td>${lecture.duration} mins</td>
                <td>
                    <button class="btn-edit" onclick="editLecture(${lecture.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteLecture(${lecture.id})">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

function editLecture(id) {
    const lectures = JSON.parse(localStorage.getItem('lectures')) || [];
    const lecture = lectures.find(l => l.id === id);

    if (lecture) {
        document.getElementById('lectureSubject').value = lecture.subjectId;
        document.getElementById('lectureTitle').value = lecture.title;
        document.getElementById('lectureUrl').value = lecture.url;
        document.getElementById('lectureDuration').value = lecture.duration;
        document.getElementById('lectureDesc').value = lecture.description || '';
        document.getElementById('lecFormTitle').textContent = 'Edit Lecture';
        document.getElementById('lectureForm').dataset.isEdit = 'true';
        document.getElementById('lectureForm').dataset.editId = id;
        document.getElementById('addLectureForm').style.display = 'block';
        updateLectureSubjectOptions();
        document.getElementById('addLectureForm').scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteLecture(id) {
    if (confirm('Are you sure you want to delete this lecture?')) {
        let lectures = JSON.parse(localStorage.getItem('lectures')) || [];
        lectures = lectures.filter(l => l.id !== id);
        localStorage.setItem('lectures', JSON.stringify(lectures));
        loadLecturesList();
        showNotification('Lecture deleted successfully', 'success');
    }
}

function setupLectureForm() {
    const form = document.getElementById('lectureForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const subjectId = parseInt(document.getElementById('lectureSubject').value);
        const title = document.getElementById('lectureTitle').value.trim();
        const url = document.getElementById('lectureUrl').value.trim();
        const duration = parseInt(document.getElementById('lectureDuration').value);
        const description = document.getElementById('lectureDesc').value.trim();
        const isEdit = this.dataset.isEdit === 'true';
        const editId = parseInt(this.dataset.editId);

        if (!subjectId || !title || !url || !duration) {
            showNotification('Please fill all required fields', 'error');
            return;
        }

        let lectures = JSON.parse(localStorage.getItem('lectures')) || [];

        if (isEdit) {
            const lectureIndex = lectures.findIndex(l => l.id === editId);
            if (lectureIndex !== -1) {
                lectures[lectureIndex] = {
                    ...lectures[lectureIndex],
                    subjectId: subjectId,
                    title: title,
                    url: url,
                    duration: duration,
                    description: description
                };
            }
            showNotification('Lecture updated successfully', 'success');
        } else {
            const newId = lectures.length > 0 ? Math.max(...lectures.map(l => l.id)) + 1 : 1;
            lectures.push({
                id: newId,
                subjectId: subjectId,
                title: title,
                url: url,
                duration: duration,
                description: description,
                addedDate: new Date().toISOString()
            });
            showNotification('Lecture added successfully', 'success');
        }

        localStorage.setItem('lectures', JSON.stringify(lectures));
        closeAddLectureForm();
        loadLecturesList();
    });
}

// ========== NEWS MANAGEMENT ==========
function openAddNewsForm() {
    document.getElementById('addNewsForm').style.display = 'block';
    document.getElementById('newsForm').reset();
    document.getElementById('newsFormTitle').textContent = 'Add News Update';
    document.getElementById('newsForm').dataset.isEdit = 'false';
    document.getElementById('newsDate').valueAsDate = new Date();
}

function closeAddNewsForm() {
    document.getElementById('addNewsForm').style.display = 'none';
    document.getElementById('newsForm').reset();
}

function loadNewsList() {
    const news = JSON.parse(localStorage.getItem('news')) || [];
    const newsList = document.getElementById('newsList');

    if (news.length === 0) {
        newsList.innerHTML = '<div class="no-data">No news updates added yet</div>';
        return;
    }

    newsList.innerHTML = news.map(item => `
        <div class="news-item-card">
            <div class="news-item-header">
                <h3>${item.icon} ${item.title}</h3>
                <span class="news-category">${item.category}</span>
            </div>
            <p class="news-content">${item.content}</p>
            <p class="news-date">📅 ${new Date(item.date).toLocaleDateString()}</p>
            <div class="news-actions">
                <button class="btn-edit" onclick="editNews(${item.id})">Edit</button>
                <button class="btn-delete" onclick="deleteNews(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function editNews(id) {
    const news = JSON.parse(localStorage.getItem('news')) || [];
    const newsItem = news.find(n => n.id === id);

    if (newsItem) {
        document.getElementById('newsTitle').value = newsItem.title;
        document.getElementById('newsCategory').value = newsItem.category;
        document.getElementById('newsContent').value = newsItem.content;
        document.getElementById('newsIcon').value = newsItem.icon;
        document.getElementById('newsDate').value = newsItem.date.split('T')[0];
        document.getElementById('newsFormTitle').textContent = 'Edit News Update';
        document.getElementById('newsForm').dataset.isEdit = 'true';
        document.getElementById('newsForm').dataset.editId = id;
        document.getElementById('addNewsForm').style.display = 'block';
        document.getElementById('addNewsForm').scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteNews(id) {
    if (confirm('Are you sure you want to delete this news update?')) {
        let news = JSON.parse(localStorage.getItem('news')) || [];
        news = news.filter(n => n.id !== id);
        localStorage.setItem('news', JSON.stringify(news));
        loadNewsList();
        showNotification('News deleted successfully', 'success');
    }
}

function setupNewsForm() {
    const form = document.getElementById('newsForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('newsTitle').value.trim();
        const category = document.getElementById('newsCategory').value;
        const content = document.getElementById('newsContent').value.trim();
        const icon = document.getElementById('newsIcon').value.trim() || '📰';
        const date = document.getElementById('newsDate').value;
        const isEdit = this.dataset.isEdit === 'true';
        const editId = parseInt(this.dataset.editId);

        if (!title || !category || !content || !date) {
            showNotification('Please fill all required fields', 'error');
            return;
        }

        let news = JSON.parse(localStorage.getItem('news')) || [];

        if (isEdit) {
            const newsIndex = news.findIndex(n => n.id === editId);
            if (newsIndex !== -1) {
                news[newsIndex] = {
                    ...news[newsIndex],
                    title: title,
                    category: category,
                    content: content,
                    icon: icon,
                    date: date
                };
            }
            showNotification('News updated successfully', 'success');
        } else {
            const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;
            news.push({
                id: newId,
                title: title,
                category: category,
                content: content,
                icon: icon,
                date: date,
                addedDate: new Date().toISOString()
            });
            showNotification('News added successfully', 'success');
        }

        localStorage.setItem('news', JSON.stringify(news));
        closeAddNewsForm();
        loadNewsList();
    });
}

// ========== ANALYTICS FUNCTIONS ==========
function viewEnrollmentTrend() {
    alert('Enrollment Trend Analytics\n\nThis would show a graph of student enrollments over time.\nFeature coming soon with chart integration!');
}

function viewSubjectPopularity() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const subjectStats = {};

    Object.values(users).forEach(user => {
        if (user.role !== 'admin' && user.subjects) {
            user.subjects.forEach(subject => {
                subjectStats[subject] = (subjectStats[subject] || 0) + 1;
            });
        }
    });

    let message = 'Subject Popularity Report\n\n';
    if (Object.keys(subjectStats).length === 0) {
        message += 'No enrollment data yet.';
    } else {
        Object.entries(subjectStats)
            .sort((a, b) => b[1] - a[1])
            .forEach(([subject, count]) => {
                message += `${subject}: ${count} students\n`;
            });
    }
    alert(message);
}

function viewLectureEngagement() {
    const lectures = JSON.parse(localStorage.getItem('lectures')) || [];
    alert('Lecture Engagement Report\n\nTotal Lectures: ' + lectures.length + '\n\nDetailed engagement metrics coming soon!');
}

function viewUserActivity() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const totalUsers = Object.keys(users).length;
    const adminCount = Object.values(users).filter(u => u.role === 'admin').length;
    const studentCount = totalUsers - adminCount;

    alert(`User Activity Report\n\nTotal Users: ${totalUsers}\nAdmins: ${adminCount}\nStudents: ${studentCount}`);
}

// ========== UTILITY FUNCTIONS ==========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '1000';
    notification.style.minWidth = '300px';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

function logout() {
    localStorage.setItem('currentUser', JSON.stringify(null));
    document.cookie = 'currentUser=; path=/; max-age=0';
    window.location.href = 'index.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check access first
    if (!checkAdminAccess()) {
        return; // Don't load page if not admin
    }
    
    initializeAdminStorage();
    displayAdminName();
    setupSubjectForm();
    setupLectureForm();
    setupNewsForm();
    updateLectureSubjectOptions();

    applyHashSectionOnLoad();
    setActiveNav();
});
