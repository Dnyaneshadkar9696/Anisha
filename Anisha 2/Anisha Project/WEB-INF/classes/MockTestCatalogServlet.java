import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MockTestCatalogServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Map<String, List<String[]>> subjectTests = new LinkedHashMap<>();

        int totalTests = 0;

        try {
            Class.forName("org.postgresql.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:postgresql://localhost:5432/studyhub",
                    "postgres",
                    "postgres");

            String sql = "SELECT COALESCE(s.subject_name, 'Unmapped Subject') AS subject_name, "
                + "m.test_name, m.form_link, m.duration, m.total_marks "
                    + "FROM mocktest m "
                + "LEFT JOIN subject s ON m.subject_id = s.subject_id "
                    + "ORDER BY s.subject_name, m.test_name";

            PreparedStatement ps = con.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                String subjectName = rs.getString("subject_name");
                totalTests++;
                if (!subjectTests.containsKey(subjectName)) {
                    subjectTests.put(subjectName, new ArrayList<String[]>());
                }

                String[] testInfo = new String[4];
                testInfo[0] = rs.getString("test_name");
                testInfo[1] = rs.getString("form_link");
                testInfo[2] = rs.getString("duration");
                testInfo[3] = rs.getString("total_marks");

                subjectTests.get(subjectName).add(testInfo);
            }

            rs.close();
            ps.close();
            con.close();

        } catch (Exception e) {
            request.setAttribute("errorMsg", "Unable to load mock tests: " + e.getMessage());
        }

        request.setAttribute("totalTests", totalTests);
        request.setAttribute("subjectTests", subjectTests);
        RequestDispatcher rd = request.getRequestDispatcher("/mocktestCatalog.jsp");
        rd.forward(request, response);
    }
}
