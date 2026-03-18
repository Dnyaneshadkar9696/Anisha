import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class SelectCourseServlet extends HttpServlet {

protected void doPost(HttpServletRequest request, HttpServletResponse response)
throws ServletException, IOException {

try {

HttpSession session = request.getSession();

int userId = (int) session.getAttribute("user_id");

int courseId = Integer.parseInt(request.getParameter("course_id"));

Class.forName("org.postgresql.Driver");

Connection con = DriverManager.getConnection(
"jdbc:postgresql://localhost:5432/studyhub",
"postgres",
"postgres"
);

String query="INSERT INTO user_course(user_id,course_id) VALUES(?,?)";

PreparedStatement ps=con.prepareStatement(query);

ps.setInt(1,userId);
ps.setInt(2,courseId);

ps.executeUpdate();

System.out.println("Course inserted successfully");

response.getWriter().write("success");

} catch(Exception e){
e.printStackTrace();
}

}
}