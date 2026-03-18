</main>
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
                    <li><a href="admin.jsp">Dashboard</a></li>
                    <li><a href="#" onclick="showSection('subjects')">Subjects</a></li>
                    <li><a href="#" onclick="showSection('lectures')">Lectures</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 StudyHub. All rights reserved.</p>
        </div>
    </footer>

    <script src="${pageContext.request.contextPath}/auth.js"></script>
<script src="${pageContext.request.contextPath}/admin.js"></script>
</body>
</html>