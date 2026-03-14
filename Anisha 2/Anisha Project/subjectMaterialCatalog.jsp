<%@ page import="java.util.*" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subject Material Catalog - StudyHub</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo-section">
                <div class="logo">
                    <div class="logo-icon"></div>
                    <span class="logo-text">StudyHub</span>
                </div>
            </div>
            <div class="nav-menu">
                <ul class="nav-list">
                    <li><a href="index.html" class="nav-link">Home</a></li>
                    <li><a href="explore.html" class="nav-link">Explore Courses</a></li>
                    <li><a href="mocktest.html" class="nav-link">Mock Tests</a></li>
                    <li><a href="study-material.html" class="nav-link">Study Material</a></li>
                    <li><a href="pricing.html" class="nav-link">Pricing Plans</a></li>
                </ul>
            </div>
            <div class="nav-buttons" id="navButtons">
                <button class="btn-login" onclick="window.location.href='login.html'">Login</button>
                <button class="btn-signup" onclick="window.location.href='signup.html'">Sign Up</button>
            </div>
        </div>
    </nav>

    <main class="study-material-container">
        <div class="study-material-header">
            <h1>Subject Material Catalog</h1>
            <p>Open subject-wise resources from the database.</p>
        </div>

        <%
            String errorMsg = (String) request.getAttribute("errorMsg");
            List<String[]> subjects = (List<String[]>) request.getAttribute("subjects");
        %>

        <% if (errorMsg != null) { %>
            <div class="alert alert-error"><%= errorMsg %></div>
        <% } %>

        <section class="study-material-grid">
            <% if (subjects == null || subjects.isEmpty()) { %>
                <p class="no-data">No subject materials found.</p>
            <% } else { %>
                <% for (String[] subject : subjects) { %>
                    <article class="study-material-card">
                        <h3><%= subject[2] %></h3>
                        <p>Course ID: <%= subject[1] %></p>
                        <% if (subject[3] != null && !subject[3].trim().isEmpty()) { %>
                            <a class="btn btn-material" href="<%= subject[3] %>" target="_blank" rel="noopener noreferrer">Open File</a>
                        <% } else { %>
                            <p class="no-data">File URL not available</p>
                        <% } %>
                    </article>
                <% } %>
            <% } %>
        </section>
    </main>

    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h4>StudyHub</h4>
                <p>Your ultimate CET preparation platform</p>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="explore.html">Courses</a></li>
                    <li><a href="mocktest.html">Mock Tests</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Contact</h4>
                <p>Email: contact@studyhub.com</p>
                <p>Phone: +91 1234567890</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 StudyHub. All rights reserved.</p>
        </div>
    </footer>

    <script src="static/script.js"></script>
    <script>requireLogin();</script>
</body>
</html>
