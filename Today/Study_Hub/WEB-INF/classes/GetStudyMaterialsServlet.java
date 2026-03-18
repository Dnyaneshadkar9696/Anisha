import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class GetStudyMaterialsServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try {
            Class.forName("org.postgresql.Driver");
            Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/studyhub", "postgres", "postgres");
            PreparedStatement ps = con.prepareStatement("SELECT subject_id, subject_name, file_url FROM subject");
            ResultSet rs = ps.executeQuery();

            String json = "[";
            while (rs.next()) {
                String subjectId = rs.getString("subject_id");
                String subjectName = rs.getString("subject_name");
                String fileUrl = rs.getString("file_url");

                if (fileUrl == null) {
                    fileUrl = "";
                }

                json += "{";
                json += "\"subject_id\":\"" + subjectId + "\",";
                json += "\"subject_name\":\"" + subjectName.replace("\"", "\\\"") + "\",";
                json += "\"file_url\":\"" + fileUrl.replace("\"", "\\\"") + "\"";
                json += "},";
            }

            if (json.endsWith(",")) {
                json = json.substring(0, json.length() - 1);
            }
            json += "]";

            out.println(json);

            rs.close();
            ps.close();
            con.close();
        } catch (Exception e) {
            out.println("[]");
            e.printStackTrace();
        }
    }
}
