

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/SaveTokenServlet")
public class SaveTokenServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        try {

            // Read JSON data sent from notifications.js
            BufferedReader reader = request.getReader();
            StringBuilder jsonBuilder = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                jsonBuilder.append(line);
            }

            String json = jsonBuilder.toString();

            // Extract token safely even when token contains ':' characters.
            String token = null;
            int tokenKeyIndex = json.indexOf("\"token\"");
            if (tokenKeyIndex >= 0) {
                int colonIndex = json.indexOf(':', tokenKeyIndex);
                int valueStartQuote = json.indexOf('"', colonIndex + 1);
                int valueEndQuote = json.indexOf('"', valueStartQuote + 1);
                if (colonIndex >= 0 && valueStartQuote >= 0 && valueEndQuote > valueStartQuote) {
                    token = json.substring(valueStartQuote + 1, valueEndQuote);
                }
            }

            if (token == null || token.trim().isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().println("Invalid token payload");
                return;
            }

            // PostgreSQL connection
            Class.forName("org.postgresql.Driver");

            Connection con = DriverManager.getConnection(
            "jdbc:postgresql://localhost:5432/studyhub",
            "postgres",
            "postgres"
        );

            // Insert token
            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO device_tokens(token) VALUES (?)"
            );

            ps.setString(1, token);
            ps.executeUpdate();

            con.close();

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().println("Token saved successfully");

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().println("Failed to save token");
        }

    }
}