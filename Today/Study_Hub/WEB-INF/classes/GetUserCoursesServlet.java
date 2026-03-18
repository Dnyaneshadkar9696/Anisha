import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class GetUserCoursesServlet extends HttpServlet {

protected void doGet(HttpServletRequest request, HttpServletResponse response)
throws ServletException, IOException {

response.setContentType("application/json");
PrintWriter out = response.getWriter();

try{

HttpSession session = request.getSession(false);

if(session == null || session.getAttribute("user_id") == null){
out.write("[]");
return;
}

int userId = (int) session.getAttribute("user_id");

Class.forName("org.postgresql.Driver");

Connection con = DriverManager.getConnection(
"jdbc:postgresql://localhost:5432/studyhub",
"postgres",
"postgres"
);

String query =
"SELECT c.course_id, c.name FROM courses c " +
"JOIN user_course uc ON c.course_id = uc.course_id " +
"WHERE uc.user_id = ?";

PreparedStatement ps = con.prepareStatement(query);
ps.setInt(1, userId);

ResultSet rs = ps.executeQuery();

String json = "[";

while(rs.next()){

json += "{";
json += "\"id\":\""+rs.getInt("course_id")+"\",";
json += "\"name\":\""+rs.getString("name")+"\"";
json += "},";

}

if(json.endsWith(",")){
json = json.substring(0,json.length()-1);
}

json += "]";

out.write(json);

con.close();

}
catch(Exception e){
e.printStackTrace();
out.write("[]");
}

}
}