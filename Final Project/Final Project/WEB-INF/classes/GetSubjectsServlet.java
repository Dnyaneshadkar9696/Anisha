import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class GetSubjectsServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        String courseId = request.getParameter("course_id");
       

        try {
            Class.forName("org.postgresql.Driver");
            Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/studyhub", "postgres", "postgres");
            PreparedStatement ps = con.prepareStatement("SELECT subject_id, subject_name FROM subject WHERE course_id = ?");
            ps.setInt(1, Integer.parseInt(courseId));
            ResultSet rs = ps.executeQuery();

            StringBuilder json = new StringBuilder("[");
            while (rs.next()) {
                json.append("{");
                json.append("\"subject_id\":\"").append(rs.getInt("subject_id")).append("\",");
                json.append("\"subject_name\":\"").append(rs.getString("subject_name").replace("\"", "\\\"")).append("\"");
                json.append("},");
            }
            if (json.toString().endsWith(",")) {
                json.setLength(json.length() - 1);
            }
            json.append("]");

            out.println(json.toString());

            rs.close();
            ps.close();
            con.close();
        } catch (Exception e) {
            out.println("[]");
            e.printStackTrace();
        }
    }
}
