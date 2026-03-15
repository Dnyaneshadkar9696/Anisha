// ========== MAIN JS ==========

// Read cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function setCookie(name, value, days) {
    const expires = days ? `; max-age=${days * 24 * 60 * 60}` : '';
    document.cookie = `${name}=${encodeURIComponent(value || '')}; path=/${expires}`;
}

function deleteCookie(name) {
    document.cookie = `${name}=; path=/; max-age=0`;
}

// Initialize storage and keep user logged in via cookie
function initializeStorage() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify({}));
    }

    // Ensure currentUser is available from cookie if present
    const stored = localStorage.getItem('currentUser');
    if (!stored || stored === 'null') {
        const cookieUser = getCookie('currentUser');
        if (cookieUser) {
            try {
                const parsed = JSON.parse(decodeURIComponent(cookieUser));
                localStorage.setItem('currentUser', JSON.stringify(parsed));
                return;
            } catch {
                // ignore invalid cookie
            }
        }

        localStorage.setItem('currentUser', JSON.stringify(null));
    }
}

// Normalize roles in currentUser to avoid casing/spacing issues.
function normalizeUserRole(user) {
    if (!user || !user.role) return user;
    user.role = user.role.toString().trim().toLowerCase();
    return user;
}

// Returns the logged-in user object if available (checks localStorage and cookie)
function getLoggedInUser() {
    let cookieUser = null;
    const cookieRaw = getCookie('currentUser');
    if (cookieRaw) {
        try {
            cookieUser = JSON.parse(decodeURIComponent(cookieRaw));
            cookieUser = normalizeUserRole(cookieUser);
        } catch {
            cookieUser = null;
        }
    }

    let localUser = null;
    try {
        localUser = JSON.parse(localStorage.getItem('currentUser'));
        localUser = normalizeUserRole(localUser);
    } catch {
        localUser = null;
    }

    // If local storage has a user but the cookie has a different user, prefer cookie (it is set on successful login)
    if (cookieUser && cookieUser.email && (!localUser || localUser.email !== cookieUser.email)) {
        localUser = cookieUser;
        localStorage.setItem('currentUser', JSON.stringify(localUser));
    }

    // If local storage is missing or invalid, fall back to cookie
    if (!localUser || !localUser.email) {
        localUser = cookieUser;
        if (localUser) {
            localStorage.setItem('currentUser', JSON.stringify(localUser));
        }
    }

    return localUser;
}

// Require login to view the page
function requireLogin(redirectTo = 'login.html') {
    const user = getLoggedInUser();
    if (!user) {
        window.location.href = redirectTo;
        return null;
    }
    return user;
}

// Check if user is logged in and update navbar
function checkUserLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navButtons = document.querySelector('.nav-buttons');
    
    if (currentUser && navButtons) {
        // User is logged in, show logout button
        navButtons.innerHTML = `
            <button class="btn-logout" onclick="logout()">Logout</button>
        `;
    }
}

// Logout
function logout() {
    localStorage.setItem('currentUser', JSON.stringify(null));
    deleteCookie('currentUser');
    window.location.href = 'index.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeStorage();
    checkUserLoggedIn();
    
    // Set copyright year
    const year = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = year;
    }
});
