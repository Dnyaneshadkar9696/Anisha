import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class SignupServlet extends HttpServlet
{
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/html");
        PrintWriter out=response.getWriter();

        String username = request.getParameter("name");
        String email = request.getParameter("email");
        String phone= request.getParameter("phone");
        String password = request.getParameter("password");
        String confirmPassword= request.getParameter("confirmPassword");
        String role=request.getParameter("role");

        if(password==null||!password.equals(confirmPassword))
        {
            out.println("<h3>Password does not match</h3>");
            return;
        }
        try
        {
            Class.forName("org.postgresql.Driver");
            Connection con=DriverManager.getConnection("jdbc:postgresql://localhost:5432/studyhub", "postgres", "postgres");
            PreparedStatement ps=con.prepareStatement("insert into users(user_name, email, ph_no, password, role) values(?, ?, ?, ?, ?)");
            ps.setString(1, username);
            ps.setString(2, email);
            ps.setString(3, phone);
            ps.setString(4, password);
            ps.setString(5, role);
            int i=ps.executeUpdate();
            if(i>0)
            {
                response.sendRedirect("login.html");
            }
            else
            {
                out.println("<h3>Signup Failed</h3>");
            }
            ps.close();
            con.close();
        }
        catch(Exception e)
        {
            out.println("<h3>Error:"+e.getMessage()+"</h3>");
        }
    }
}