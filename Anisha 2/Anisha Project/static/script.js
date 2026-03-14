// ========== MAIN JS ==========

function initializeStorage() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify({}));
    }
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(null));
    }
}

function hasServerSession() {
    return document.cookie
        .split(';')
        .map(function(c) { return c.trim(); })
        .some(function(c) { return c.indexOf('JSESSIONID=') === 0; });
}

function getCurrentUser() {
    try {
        var val = localStorage.getItem('currentUser');
        if (!val) return null;
        var user = JSON.parse(val);
        if (!user || typeof user !== 'object') return null;
        if (!user.email || !user.role) return null;
        return user;
    } catch (e) {
        return null;
    }
}

function checkUserLoggedIn() {
    var currentUser = getCurrentUser();
    var navButtons = document.querySelector('.nav-buttons');
    if (!navButtons) return;

    if (currentUser) {
        navButtons.innerHTML = '<button class="btn-logout" onclick="logout()">Logout</button>';
    } else {
        navButtons.innerHTML =
            '<button class="btn-login" onclick="window.location.href=\'login.html\'">Login</button>' +
            '<button class="btn-signup" onclick="window.location.href=\'signup.html\'">Sign Up</button>';
    }
}

function requireLogin() {
    if (!getCurrentUser()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function logout() {
    localStorage.setItem('currentUser', JSON.stringify(null));
    window.location.href = 'LogoutServlet';
}

document.addEventListener('DOMContentLoaded', function () {
    initializeStorage();
    checkUserLoggedIn();
});
