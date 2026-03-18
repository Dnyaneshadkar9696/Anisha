import java.io.IOException;
import java.sql.*;

import javax.servlet.*;
import javax.servlet.http.*;

public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Redirect GET requests to the login page
        response.sendRedirect(request.getContextPath() + "/login.html");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        String contextPath = request.getContextPath();
        if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
            response.sendRedirect(contextPath + "/login-error.html?reason=invalid");
            return;
        }

        try {
            Class.forName("org.postgresql.Driver");
            try (Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/studyhub", "postgres", "postgres");
                 PreparedStatement ps = con.prepareStatement("SELECT * FROM users WHERE email = ? AND password = ?")) {

                ps.setString(1, email);
                ps.setString(2, password);

                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        String role = rs.getString("role");
                        if (role == null || role.trim().isEmpty()) {
                            role = "student";
                        } else {
                            role = role.trim().toLowerCase();
                        }
                        int userId = rs.getInt("user_id");
                        String fullname = rs.getString("user_name");
                        HttpSession session = request.getSession();
                        session.setAttribute("user_id", userId);
                        System.out.println("[LoginServlet] user=" + email + " role=" + role);

                        String userJson = "{"
                                + "\"email\":\"" + email + "\"," 
                                + "\"fullname\":\"" + fullname.replace("\"", "\\\"") + "\"," 
                                + "\"role\":\"" + role + "\"," 
                                + "\"subjects\":[]," 
                                + "\"studyHours\":0," 
                                + "\"testsCompleted\":0"
                                + "}";

                        javax.servlet.http.Cookie userCookie = new javax.servlet.http.Cookie("currentUser", java.net.URLEncoder.encode(userJson, "UTF-8"));
                        userCookie.setPath("/");
                        userCookie.setMaxAge(60 * 60 * 24); // 1 day
                        response.addCookie(userCookie);

                        String redirectPage = role.equalsIgnoreCase("admin") ? "/admin.html" : "/dashboard.html";
                        response.sendRedirect(contextPath + redirectPage);
                        return;
                    }
                }
            }

            response.sendRedirect(contextPath + "/login-error.html?reason=invalid");

        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect(contextPath + "/login-error.html?reason=server");
        }
    }
}
