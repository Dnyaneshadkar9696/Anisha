<%@ page import="java.sql.*"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Mock Test - StudyHub</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <script>
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser || currentUser.role !== 'admin') {
                window.location.href = 'login.html';
            }
        } catch (e) {
            window.location.href = 'login.html';
        }
    </script>

    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo-section">
                <div class="logo">
                    <div class="logo-icon"></div>
                    <span class="logo-text">StudyHub Admin</span>
                </div>
            </div>
            <div class="nav-menu">
                <ul class="nav-list">
                    <li><a href="admin.html" class="nav-link">Dashboard</a></li>
                    <li><a href="AdminGetSubjectsServlet" class="nav-link">Subjects</a></li>
                    <li><a href="createMockTest.html" class="nav-link">Mocktests</a></li>
                    <li><a href="manageNews.html" class="nav-link">News Updates</a></li>
                    <li><a href="AdminAboutus.html" class="nav-link">About Us</a></li>
                </ul>
            </div>
            <div class="nav-buttons">
                <button class="btn-logout" onclick="logout()">Logout</button>
            </div>
        </div>
    </nav>

    <div class="manage-subjects">
    <h2>Manage Subjects</h2>

    <!-- Add Subject Form -->
    <form id="addSubjectForm" action="AddSubjectServlet" method="post">
        <select id="courseSelect" name="course_id" required>
            <option value="">Select Course</option>
            <option value="1">MBA</option>
            <option value="2">MCA</option>
            <!-- Add more courses if needed -->
        </select>
        <input type="text" id="subjectName" name="subject_name" placeholder="Enter subject name" required>
        <input type="url" id="fileUrl" name="file_url" placeholder="Enter resource URL" required>
        <button type="submit">Add Subject</button>
    </form>

    <!-- Subjects Table -->
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Course</th>
                <th>Subject Name</th>
                <th>Resource URL</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>

<%
ResultSet rs = (ResultSet) request.getAttribute("subjects");

if(rs != null){
    while(rs.next()){
%>

<tr>

<td><%= rs.getInt("subject_id") %></td>

<td>
<%= rs.getInt("course_id")==1 ? "MBA" : "MCA" %>
</td>

<td><%= rs.getString("subject_name") %></td>

<td>
<a href="<%= rs.getString("file_url") %>" target="_blank">
Open
</a>
</td>

<td>
<a href="DeleteSubjectServlet?subject_id=<%= rs.getInt("subject_id") %>">
Delete
</a>
</td>

</tr>

<%
    }
}
%>

</tbody>
    </table>
</div>

<footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h4>StudyHub Admin</h4>
                <p>Content Management System</p>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="admin.html">Dashboard</a></li>
                    <li><a href="#" onclick="showSection('subjects')">Subjects</a></li>
                    <li><a href="#" onclick="showSection('lectures')">Lectures</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 StudyHub. All rights reserved.</p>
        </div>
    </footer>

    <script src="static/script.js"></script>
    <script src="auth.js"></script>
    <script src="admin.js"></script>
</body>
</html>