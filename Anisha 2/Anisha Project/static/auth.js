// ========== AUTHENTICATION JS ==========

// Initialize localStorage structure
function initializeStorage() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify({}));
    }
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(null));
    }
}

// Show notification
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

// Check if user already logged in
function checkUserLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const hasSession = document.cookie
        .split(';')
        .map(function (cookie) { return cookie.trim(); })
        .some(function (cookie) { return cookie.indexOf('JSESSIONID=') === 0; });

    if (currentUser && hasSession) {
        window.location.href = 'dashboard.html';
    } else if (currentUser && !hasSession) {
        localStorage.setItem('currentUser', JSON.stringify(null));
    }
}

// Sign up functionality
function setupSignupForm() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    // Toggle subjects section based on role selection
    const roleRadios = document.querySelectorAll('input[name="userRole"]');
    roleRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const subjectsSection = document.getElementById('subjectsSection');
            if (this.value === 'admin') {
                subjectsSection.style.display = 'none';
                // Uncheck all subjects for admin
                document.querySelectorAll('input[name="subjects"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
            } else {
                subjectsSection.style.display = 'block';
            }
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

        // Get form values
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const selectedSubjects = Array.from(document.querySelectorAll('input[name="subjects"]:checked'))
            .map(el => el.value);

        let hasError = false;

        // Validation
        if (!fullname) {
            document.getElementById('error-fullname').textContent = 'Full name is required';
            hasError = true;
        }

        if (!email || !isValidEmail(email)) {
            document.getElementById('error-email').textContent = 'Valid email is required';
            hasError = true;
        }

        if (password.length < 6) {
            document.getElementById('error-password').textContent = 'Password must be at least 6 characters';
            hasError = true;
        }

        if (password !== confirmPassword) {
            document.getElementById('error-confirm-password').textContent = 'Passwords do not match';
            hasError = true;
        }

        const userRole = document.getElementById('userRole').value || 'student';
        
        // Only require subjects for students
        if (userRole === 'student' && selectedSubjects.length === 0) {
            document.getElementById('error-subjects').textContent = 'Please select at least one subject';
            hasError = true;
        }

        if (hasError) return;

        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('users'));
        if (users[email]) {
            document.getElementById('error-email').textContent = 'Email already registered';
            return;
        }

        // Create new user
        const newUser = {
            fullname: fullname,
            email: email,
            password: password,
            role: userRole,
            subjects: selectedSubjects,
            enrolledSubjects: selectedSubjects,
            studyHours: 0,
            testsCompleted: 0,
            createdDate: new Date().toISOString()
        };

        users[email] = newUser;
        localStorage.setItem('users', JSON.stringify(users));

        showNotification('Account created successfully! Redirecting to login...', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
}

// Login functionality
function setupLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        document.getElementById('login-error-msg').style.display = 'none';

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        let hasError = false;

        if (!email || !isValidEmail(email)) {
            document.getElementById('error-login-email').textContent = 'Valid email is required';
            hasError = true;
        }

        if (!password) {
            document.getElementById('error-login-password').textContent = 'Password is required';
            hasError = true;
        }

        if (hasError) return;

        // Check credentials
        const users = JSON.parse(localStorage.getItem('users'));
        
        if (!users[email]) {
            showNotification('Please sign up first!', 'error');
            return;
        }

        if (users[email].password !== password) {
            showNotification('Invalid email or password', 'error');
            return;
        }

        // Set current user
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            fullname: users[email].fullname,
            role: users[email].role || 'student',
            subjects: users[email].enrolledSubjects || users[email].subjects,
            studyHours: users[email].studyHours || 0,
            testsCompleted: users[email].testsCompleted || 0
        }));

        showNotification('Login successful! Redirecting...', 'success');
        
        // Redirect based on role
        const userRole = users[email].role || 'student';
        setTimeout(() => {
            if (userRole === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        }, 1500);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Logout
function logout() {
    localStorage.setItem('currentUser', JSON.stringify(null));
    window.location.href = 'LogoutServlet';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeStorage();
    
    // Check which page we're on
    if (document.body.contains(document.getElementById('signupForm'))) {
        checkUserLoggedIn();
        setupSignupForm();
    } else if (document.body.contains(document.getElementById('loginForm'))) {
        checkUserLoggedIn();
        setupLoginForm();
    }
});
