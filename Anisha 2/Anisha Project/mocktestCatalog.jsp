<%@ page import="java.util.*" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mock Tests - StudyHub</title>
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
                    <li><a href="dashboard.html" class="nav-link">Dashboard</a></li>
                    <li><a href="explore.html" class="nav-link">Explore Courses</a></li>
                    <li><a href="MockTestCatalogServlet" class="nav-link active">Mock Tests</a></li>
                    <li><a href="study-material.html" class="nav-link">Study Material</a></li>
                    <li><a href="pricing.html" class="nav-link">Pricing Plans</a></li>
                </ul>
            </div>
            <div class="nav-buttons">
                <button class="btn-logout" onclick="logout()">Logout</button>
            </div>
        </div>
    </nav>

    <div class="mocktest-container">
        <div class="mocktest-header">
            <h1>StudyHub Mock Tests</h1>
            <p>Select your subject and open any mock test.</p>
        </div>

        <%
            String errorMsg = (String) request.getAttribute("errorMsg");
            Map<String, List<String[]>> subjectTests = (Map<String, List<String[]>>) request.getAttribute("subjectTests");
            Integer totalTests = (Integer) request.getAttribute("totalTests");
        %>

        <% if (errorMsg != null) { %>
            <div class="alert alert-error"><%= errorMsg %></div>
        <% } %>

        <% if (totalTests != null) { %>
            <p class="no-data" style="margin: 0 0 16px 0;">Total tests found: <%= totalTests %></p>
        <% } %>

        <% if (subjectTests == null || subjectTests.isEmpty()) { %>
            <section class="dashboard-section subject-mock-section">
                <h2>No Mock Tests Available</h2>
                <p class="no-data">No mock tests are available right now. Please check again later.</p>
            </section>
        <% } else { %>
            <% for (Map.Entry<String, List<String[]>> entry : subjectTests.entrySet()) { %>
                <section class="dashboard-section subject-mock-section">
                    <h2><%= entry.getKey() %></h2>
                    <div class="subject-tests-grid">
                        <% for (String[] test : entry.getValue()) { %>
                            <a class="btn-action btn-primary" href="<%= test[1] %>" target="_blank" rel="noopener noreferrer">
                                <%= test[0] %>
                            </a>
                        <% } %>
                    </div>
                </section>
            <% } %>
        <% } %>
    </div>

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
                    <li><a href="MockTestCatalogServlet">Mock Tests</a></li>
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
