import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {

    public List<String> getAllEmails() {
        List<String> emails = new ArrayList<>();

        try {
            Class.forName("org.postgresql.Driver");
            try (Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/studyhub", "postgres", "postgres");
                 PreparedStatement ps = con.prepareStatement("SELECT email FROM users WHERE email IS NOT NULL AND email <> ''");
                 ResultSet rs = ps.executeQuery()) {

                while (rs.next()) {
                    emails.add(rs.getString("email"));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return emails;
    }
}
