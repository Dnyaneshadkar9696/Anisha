import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/SendNotificationServlet")
public class SendNotificationServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String subject = request.getParameter("subject");
        String message = request.getParameter("message");

        // If form fields are present, handle admin email broadcast flow.
        if (subject != null || message != null) {
            handleEmailNotification(request, response);
            return;
        }

        response.setContentType("application/json");

        String serverKey = System.getenv("FCM_SERVER_KEY");
        if (serverKey == null || serverKey.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"success\":false,\"message\":\"FCM_SERVER_KEY is not configured\"}");
            return;
        }

        String body = readBody(request);
        String title = extractJsonValue(body, "title");
        String message = extractJsonValue(body, "message");

        if (title == null || title.trim().isEmpty()) {
            title = "StudyHub Update";
        }
        if (message == null || message.trim().isEmpty()) {
            message = "New update available.";
        }

        List<String> tokens = new ArrayList<>();

        try {
            Class.forName("org.postgresql.Driver");
            try (Connection con = DriverManager.getConnection(
                    "jdbc:postgresql://localhost:5432/studyhub",
                    "postgres",
                    "postgres");
                 PreparedStatement ps = con.prepareStatement("SELECT DISTINCT token FROM device_tokens WHERE token IS NOT NULL AND token <> ''");
                 ResultSet rs = ps.executeQuery()) {

                while (rs.next()) {
                    tokens.add(rs.getString("token"));
                }
            }

            if (tokens.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"success\":true,\"sent\":0,\"message\":\"No device tokens found\"}");
                return;
            }

            String payload = buildLegacyPayload(tokens, title, message);
            String fcmResponse = sendLegacyFcm(serverKey, payload);

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"success\":true,\"sent\":" + tokens.size() + ",\"fcmResponse\":" + jsonString(fcmResponse) + "}");

        } catch (Exception ex) {
            ex.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"success\":false,\"message\":" + jsonString(ex.getMessage()) + "}");
        }
    }

    private void handleEmailNotification(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String subject = request.getParameter("subject");
        String message = request.getParameter("message");

        if (subject == null || subject.trim().isEmpty() || message == null || message.trim().isEmpty()) {
            response.setContentType("text/plain");
            response.getWriter().println("Subject and message are required.");
            return;
        }

        UserDAO dao = new UserDAO();
        List<String> emails = dao.getAllEmails();

        int sent = 0;
        int failed = 0;

        for (String email : emails) {
            try {
                EmailUtil.sendEmail(email, subject, message);
                sent++;
            } catch (Exception e) {
                failed++;
                e.printStackTrace();
            }
        }

        response.setContentType("text/plain");
        response.getWriter().println("Emails sent. Success: " + sent + ", Failed: " + failed + ", Total: " + emails.size());
    }

    private String readBody(HttpServletRequest request) throws IOException {
        StringBuilder jsonBuilder = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                jsonBuilder.append(line);
            }
        }
        return jsonBuilder.toString();
    }

    private String extractJsonValue(String json, String key) {
        if (json == null) {
            return null;
        }
        String keyPattern = "\"" + key + "\"";
        int keyIndex = json.indexOf(keyPattern);
        if (keyIndex < 0) {
            return null;
        }

        int colonIndex = json.indexOf(':', keyIndex);
        if (colonIndex < 0) {
            return null;
        }

        int startQuote = json.indexOf('"', colonIndex + 1);
        if (startQuote < 0) {
            return null;
        }

        int endQuote = startQuote + 1;
        while (endQuote < json.length()) {
            if (json.charAt(endQuote) == '"' && json.charAt(endQuote - 1) != '\\') {
                break;
            }
            endQuote++;
        }

        if (endQuote >= json.length()) {
            return null;
        }

        return json.substring(startQuote + 1, endQuote)
                .replace("\\\"", "\"")
                .replace("\\\\", "\\");
    }

    private String buildLegacyPayload(List<String> tokens, String title, String message) {
        StringBuilder sb = new StringBuilder();
        sb.append("{\"registration_ids\":[");
        for (int i = 0; i < tokens.size(); i++) {
            if (i > 0) {
                sb.append(',');
            }
            sb.append(jsonString(tokens.get(i)));
        }
        sb.append("],\"notification\":{");
        sb.append("\"title\":").append(jsonString(title)).append(',');
        sb.append("\"body\":").append(jsonString(message));
        sb.append("}}");
        return sb.toString();
    }

    private String sendLegacyFcm(String serverKey, String payload) throws IOException {
        URL url = new URL("https://fcm.googleapis.com/fcm/send");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization", "key=" + serverKey);
        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setDoOutput(true);

        try (OutputStream os = conn.getOutputStream()) {
            os.write(payload.getBytes(StandardCharsets.UTF_8));
        }

        InputStream responseStream = conn.getResponseCode() >= 200 && conn.getResponseCode() < 300
                ? conn.getInputStream()
                : conn.getErrorStream();

        StringBuilder responseBody = new StringBuilder();
        if (responseStream != null) {
            try (BufferedReader br = new BufferedReader(new java.io.InputStreamReader(responseStream, StandardCharsets.UTF_8))) {
                String line;
                while ((line = br.readLine()) != null) {
                    responseBody.append(line);
                }
            }
        }

        return responseBody.toString();
    }

    private String jsonString(String value) {
        if (value == null) {
            return "\"\"";
        }
        return "\"" + value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\r", "")
                .replace("\n", "\\n") + "\"";
    }
}
