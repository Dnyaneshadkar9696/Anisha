import java.io.IOException;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class GetMockTestsServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            Class.forName("org.postgresql.Driver");
            try (Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/studyhub", "postgres", "postgres")) {
                String sql = "SELECT m.mocktest_id, m.test_name, m.duration, m.total_marks, m.total_ques, m.form_link, s.subject_name "
                           + "FROM mocktest m "
                           + "LEFT JOIN subject s ON m.subject_id = s.subject_id";

                try (PreparedStatement ps = con.prepareStatement(sql); ResultSet rs = ps.executeQuery()) {
                    StringBuilder json = new StringBuilder();
                    json.append("[");
                    boolean first = true;

                    while (rs.next()) {
                        if (!first) json.append(",");
                        first = false;

                        int id = rs.getInt("mocktest_id");
                        String name = rs.getString("test_name");
                        int duration = rs.getInt("duration");
                        int totalMarks = rs.getInt("total_marks");
                        int totalQues = rs.getInt("total_ques");
                        String formLink = rs.getString("form_link");
                        String subjectName = rs.getString("subject_name");

                        json.append("{");
                        json.append("\"id\":").append(id).append(",");
                        json.append("\"name\":\"").append(escapeJson(name)).append("\",");
                        json.append("\"duration\":").append(duration).append(",");
                        json.append("\"totalMarks\":").append(totalMarks).append(",");
                        json.append("\"totalQuestions\":").append(totalQues).append(",");
                        json.append("\"formLink\":\"").append(escapeJson(formLink)).append("\",");
                        json.append("\"subject\":\"").append(escapeJson(subjectName)).append("\"");
                        json.append("}");
                    }

                    json.append("]");
                    response.getWriter().write(json.toString());
                }
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("[]");
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    private String escapeJson(String value) {
        if (value == null) return "";
        return value.replace("\\", "\\\\")
                    .replace("\"", "\\\"")
                    .replace("\n", "\\n")
                    .replace("\r", "\\r");
    }
}
