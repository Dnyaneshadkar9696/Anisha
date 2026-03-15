// ========== MOCK TESTS JS ==========

console.log('[mocktest.js] loaded');

// List of mock tests fetched from the server
let mockTests = [];

// Fetch mock tests from the backend
async function loadMockTests() {
    const status = document.getElementById('mocktestStatus');
    if (status) {
        status.style.display = 'block';
        status.textContent = 'Loading mock tests...';
    }

    try {
        const res = await fetch('GetMockTestsServlet');
        if (!res.ok) {
            throw new Error(`Failed to load mock tests (status ${res.status})`);
        }

        const tests = await res.json();
        console.log('Mock tests response:', tests);

        if (Array.isArray(tests) && tests.length) {
            mockTests = tests.map(test => ({
                id: test.id,
                name: test.name,
                questions: test.totalQuestions,
                duration: `${test.duration} minutes`,
                difficulty: 'Medium',
                description: test.subject || 'Mock test',
                formLink: test.formLink || ''
            }));
        } else {
            mockTests = [];
        }

        renderTestsGrid();

        if (status) {
            if (mockTests.length) {
                status.style.display = 'none';
            } else {
                status.textContent = 'No mock tests available right now.';
            }
        }
    } catch (err) {
        console.error('Error loading mock tests:', err);
        if (status) {
            status.style.display = 'block';
            status.textContent = 'Unable to load mock tests. Please try again later.';
        }
        renderTestsGrid();
    }
}

// Get current user
function getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
}

// Check if user is logged in
function checkUserLogin() {
    const user = getLoggedInUser();
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

    if (!mockTests || !mockTests.length) {
        grid.innerHTML = '<p class="no-data">No mock tests available at the moment. Please check back later.</p>';
        return;
    }

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
            <button class="btn-take-test" onclick="takeTest(${test.id}, '${safeJsString(test.name)}', '${safeJsString(test.formLink)}')">
                Start Test
            </button>
        </div>
    `).join('');
}

// Safely encode strings for inline event handlers
function safeJsString(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\"/g, '\\"');
}

// Take test
function takeTest(testId, testName, formLink) {
    const user = getLoggedInUser();

    if (!user) {
        alert('Please log in to take tests');
        window.location.href = 'login.html';
        return;
    }

    const confirmed = confirm(`Do you want to start the test: "${testName}"?`);
    if (!confirmed) return;

    // Store selected test in session
    sessionStorage.setItem('selectedTest', JSON.stringify({
        id: testId,
        name: testName,
        formLink: formLink || ''
    }));

    // Store selected test (including optional form link) and always redirect to the internal exam page
    sessionStorage.setItem('selectedTest', JSON.stringify({
        id: testId,
        name: testName,
        formLink: formLink || ''
    }));
    window.location.href = 'exam.html';
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
document.addEventListener('DOMContentLoaded', async function() {
    const user = requireLogin('login.html');
    if (!user) return;

    checkUserLogin();
    await loadMockTests();
});

// Logout function
function logout() {
    localStorage.setItem('currentUser', JSON.stringify(null));
    window.location.href = 'index.html';
}
