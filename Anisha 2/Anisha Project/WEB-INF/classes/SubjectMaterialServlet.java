import java.io.IOException;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SubjectMaterialServlet extends HttpServlet {

    private boolean hasColumn(Connection con, String tableName, String columnName) throws Exception {
        DatabaseMetaData metaData = con.getMetaData();
        try (ResultSet cols = metaData.getColumns(null, null, tableName, columnName)) {
            return cols.next();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        List<String[]> subjects = new ArrayList<String[]>();

        try {
            Class.forName("org.postgresql.Driver");
            try (Connection con = DriverManager.getConnection(
                    "jdbc:postgresql://localhost:5432/studyhub",
                    "postgres",
                    "postgres")) {

                boolean hasFileUrl = hasColumn(con, "subject", "file_url");
                String sql;
                if (hasFileUrl) {
                    sql = "SELECT subject_id, course_id, subject_name, file_url FROM subject ORDER BY subject_name";
                } else {
                    sql = "SELECT subject_id, course_id, subject_name, NULL AS file_url FROM subject ORDER BY subject_name";
                }

                try (PreparedStatement ps = con.prepareStatement(sql);
                        ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        String[] row = new String[4];
                        row[0] = rs.getString("subject_id");
                        row[1] = rs.getString("course_id");
                        row[2] = rs.getString("subject_name");
                        row[3] = rs.getString("file_url");
                        subjects.add(row);
                    }
                }
            }
        } catch (Exception e) {
            request.setAttribute("errorMsg", "Unable to load subject materials: " + e.getMessage());
        }

        request.setAttribute("subjects", subjects);
        RequestDispatcher rd = request.getRequestDispatcher("/subjectMaterialCatalog.jsp");
        rd.forward(request, response);
    }
}
