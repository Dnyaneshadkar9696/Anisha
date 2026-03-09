import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SaveScoreServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        String email = request.getParameter("email");
        String testName = request.getParameter("testName");
        String canvaLink = request.getParameter("canvaLink");

        int totalQuestions = parseIntValue(request.getParameter("totalQuestions"));
        int answeredQuestions = parseIntValue(request.getParameter("answeredQuestions"));
        int correctAnswers = parseIntValue(request.getParameter("correctAnswers"));
        int score = parseIntValue(request.getParameter("score"));

        if (email == null || email.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"status\":\"error\",\"message\":\"email is required\"}");
            return;
        }

        if (testName == null || testName.trim().isEmpty()) {
            testName = "CET Mock Test";
        }

        try {
            Class.forName("org.postgresql.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:postgresql://localhost:5432/studyhub", "postgres", "postgres");

            Statement st = con.createStatement();
            st.executeUpdate("CREATE TABLE IF NOT EXISTS test_scores ("
                    + "id SERIAL PRIMARY KEY,"
                    + "email VARCHAR(255) NOT NULL,"
                    + "test_name VARCHAR(120) NOT NULL,"
                    + "canva_link TEXT,"
                    + "total_questions INT NOT NULL,"
                    + "answered_questions INT NOT NULL,"
                    + "correct_answers INT NOT NULL,"
                    + "score INT NOT NULL,"
                    + "submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
                    + ")");
            st.close();

            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO test_scores(email, test_name, canva_link, total_questions, answered_questions, correct_answers, score) "
                            + "VALUES (?, ?, ?, ?, ?, ?, ?)");
            ps.setString(1, email);
            ps.setString(2, testName);
            ps.setString(3, canvaLink);
            ps.setInt(4, totalQuestions);
            ps.setInt(5, answeredQuestions);
            ps.setInt(6, correctAnswers);
            ps.setInt(7, score);
            ps.executeUpdate();

            ps.close();
            con.close();

            out.print("{\"status\":\"success\"}");
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            String message = e.getMessage() == null ? "unknown error" : e.getMessage().replace("\"", "'");
            out.print("{\"status\":\"error\",\"message\":\"" + message + "\"}");
        }
    }

    private int parseIntValue(String value) {
        try {
            return Integer.parseInt(value);
        } catch (Exception e) {
            return 0;
        }
    }
}
