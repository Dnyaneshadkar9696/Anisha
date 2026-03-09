// ========== MAIN JS ==========

// Initialize storage
function initializeStorage() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify({}));
    }
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(null));
    }
}

// Check if user is logged in and redirect
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
