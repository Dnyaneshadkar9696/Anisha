

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

            // Extract token value
            String token = json.split(":")[1].replace("\"", "").replace("}", "");

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

            response.getWriter().println("Token saved successfully");

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}