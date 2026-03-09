// ========== MOCK TESTS JS ==========

// Available mock tests
const mockTests = [
    {
        id: 1,
        name: 'CET Full Mock Test 1',
        questions: 60,
        duration: '1 hour 30 minutes',
        difficulty: 'Easy',
        description: 'Complete CET exam simulation with all subjects'
    },
    {
        id: 2,
        name: 'CET Full Mock Test 2',
        questions: 60,
        duration: '1 hour 30 minutes',
        difficulty: 'Medium',
        description: 'Practice with comprehensive question set'
    },
    {
        id: 3,
        name: 'Quantitative Ability Practice',
        questions: 20,
        duration: '40 minutes',
        difficulty: 'Medium',
        description: 'Focus on quantitative questions'
    },
    {
        id: 4,
        name: 'Logical Reasoning Test',
        questions: 20,
        duration: '40 minutes',
        difficulty: 'Hard',
        description: 'Master logical reasoning section'
    },
    {
        id: 5,
        name: 'Verbal Ability & RC',
        questions: 20,
        duration: '40 minutes',
        difficulty: 'Medium',
        description: 'Practice verbal and reading comprehension'
    }
];

// Get current user
function getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
}

// Check if user is logged in
function checkUserLogin() {
    const user = getCurrentUser();
    const messageDiv = document.getElementById('notLoggedInMessage');
    const navButtons = document.getElementById('navButtons');
    
    if (!user) {
        if (messageDiv) messageDiv.style.display = 'block';
        if (navButtons) {
            navButtons.innerHTML = `
                <button class="btn-login" onclick="window.location.href='login.html'">Login</button>
                <button class="btn-signup" onclick="window.location.href='signup.html'">Sign Up</button>
            `;
        }
    } else if (navButtons) {
        navButtons.innerHTML = `
            <button class="btn-logout" onclick="logout()">Logout</button>
        `;
    }
}

// Render tests grid
function renderTestsGrid() {
    const grid = document.getElementById('testsGrid');
    
    grid.innerHTML = mockTests.map(test => `
        <div class="test-card">
            <div class="test-icon"></div>
            <h3>${test.name}</h3>
            <p style="color: #666; font-size: 14px;">${test.description}</p>
            <div class="test-details">
                <div class="test-detail">
                    <span class="detail-label">Questions:</span>
                    <span>${test.questions}</span>
                </div>
                <div class="test-detail">
                    <span class="detail-label">Duration:</span>
                    <span>${test.duration}</span>
                </div>
                <div class="test-detail">
                    <span class="detail-label">Difficulty:</span>
                    <span>${test.difficulty}</span>
                </div>
            </div>
            <button class="btn-take-test" onclick="takeTest(${test.id}, '${test.name}')">
                Start Test
            </button>
        </div>
    `).join('');
}

// Take test
function takeTest(testId, testName) {
    const user = getCurrentUser();
    
    if (!user) {
        alert('Please log in to take tests');
        window.location.href = 'login.html';
        return;
    }

    const confirmed = confirm(`Do you want to start the test: "${testName}"?`);
    
    if (confirmed) {
        // Store selected test in session
        sessionStorage.setItem('selectedTest', JSON.stringify({
            id: testId,
            name: testName
        }));
        
        window.location.href = 'exam.html';
    }
}

// Close test modal
function closeTestModal() {
    const modal = document.getElementById('testModal');
    if (modal) modal.style.display = 'none';
}

// Start test from modal
function startTest() {
    window.location.href = 'exam.html';
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    checkUserLogin();
    renderTestsGrid();
});

// Logout function
function logout() {
    localStorage.setItem('currentUser', JSON.stringify(null));
    window.location.href = 'index.html';
}
