import java.io.*;
import java.lang.*;
import java.sql.*;

import javax.servlet.*;
import javax.servlet.http.*;
public class LoginServlet extends HttpServlet
{
    protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException
    {
        response.setContentType("text/html");
        PrintWriter out=response.getWriter();
        String email=request.getParameter("email");
        String password=request.getParameter("password");
        try
        {
            Class.forName("org.postgresql.Driver");
            Connection con =DriverManager.getConnection("jdbc:postgresql://localhost:5432/studyhub","postgres","postgres");
            PreparedStatement ps = con.prepareStatement("select * from users where email=? and password=?");
            ps.setString(1, email);
            ps.setString(2, password);
            ResultSet rs=ps.executeQuery();
            if(rs.next())
            {
                String role=rs.getString("role");
                HttpSession session= request.getSession();
                session.setAttribute("user", email);
                session.setAttribute("role", role);
                if(role.equalsIgnoreCase("admin"))
                {
                    response.sendRedirect("admin.html");
                }
                else if(role.equalsIgnoreCase("student"))
                {
                    response.sendRedirect("dashboard.html");
                }

             }       
            else
            {
                out.println("<h3>Invalid Email or password</h3>");
            }
             rs.close();
             ps.close();
             con.close();

        }
        catch(Exception e)
        {
            out.print("<h3>Error:"+e.getMessage()+"</h3>");
        }
    }

}