import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class AddSubjectServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String courseId = request.getParameter("course_id");
        String subjectName = request.getParameter("subject_name");
        String fileUrl = request.getParameter("file_url");

        if(courseId == null || courseId.equals("")) 
            {
                response.getWriter().println("Please select a course");
                return;
            }

        try {

            Class.forName("org.postgresql.Driver");

            Connection con = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/studyhub",
                "postgres",
                "postgres"
            );

            String query = "INSERT INTO subject (course_id, subject_name, file_url) VALUES (?, ?, ?)";

            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, Integer.parseInt(courseId));
            ps.setString(2, subjectName);
            ps.setString(3, fileUrl);

            ps.executeUpdate();

           response.sendRedirect("AdminGetSubjectsServlet");

        } catch(Exception e) {
            e.printStackTrace();
            response.getWriter().println("ERROR: "+e.getMessage());
        }
    }
}