import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class LoginServlet extends HttpServlet
{
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        try
        {
            Class.forName("org.postgresql.Driver");
            Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/studyhub", "postgres", "postgres");
            PreparedStatement ps = con.prepareStatement("SELECT * FROM users WHERE email=? AND password=?");
            ps.setString(1, email);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();

            if (rs.next())
            {
                HttpSession session = request.getSession();
                session.setAttribute("user", rs.getString("email"));
                session.setAttribute("name", rs.getString("user_name"));
                session.setAttribute("role", rs.getString("role"));
                response.sendRedirect("dashboard.html");
            }
            else
            {
                out.println("<h3>Invalid email or password</h3>");
            }
            rs.close();
            ps.close();
            con.close();
        }
        catch (Exception e)
        {
            out.println("<h3>Error: " + e.getMessage() + "</h3>");
        }
    }
}