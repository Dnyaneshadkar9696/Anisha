import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class DeleteSubjectServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String subjectId = request.getParameter("subject_id");

        try {

            Class.forName("org.postgresql.Driver");

            Connection con = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/studyhub",
                "postgres",
                "postgres"
            );

            String query = "DELETE FROM subject WHERE subject_id = ?";

            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, Integer.parseInt(subjectId));

            ps.executeUpdate();

            ps.close();
            con.close();

            // reload subjects page
            response.sendRedirect("AdminGetSubjectsServlet");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}