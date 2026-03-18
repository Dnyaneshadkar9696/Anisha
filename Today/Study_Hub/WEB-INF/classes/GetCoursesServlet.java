import java.io.*;
import java.lang.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class GetCoursesServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException
    {
        response.setContentType("application/json");
        PrintWriter out=response.getWriter();

        try
        {
            Class.forName("org.postgresql.Driver");
            Connection con=DriverManager.getConnection("jdbc:postgresql://localhost:5432/studyhub","postgres","postgres");
            PreparedStatement ps=con.prepareStatement("select * from course");
            ResultSet rs=ps.executeQuery();

            String json="[";

            while(rs.next())
            {
                json+="{";
                json+="\"id\":\""+rs.getInt("course_id")+"\",";
                json+="\"name\":\""+rs.getString("course_name")+"\",";
                json+="\"duration\":\""+rs.getString("duration")+"\",";
                json+="\"price\":\""+rs.getInt("fees")+"\"";
                json+="},";
            }
            if(json.endsWith(","))
            {
                json=json.substring(0, json.length()-1);
            }
            json+="]";
            out.println(json);
            
            rs.close();
            ps.close();
            con.close();
        }
        catch(Exception e)
        {
            out.println(e);
        }
    }
}