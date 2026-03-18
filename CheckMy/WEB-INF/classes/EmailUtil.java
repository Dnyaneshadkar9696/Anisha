import java.io.InputStream;
import java.util.Properties;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

public class EmailUtil {

    private static final String SMTP_CONFIG_FILE = "smtp.properties";

    private static Properties loadSmtpConfig() {
        Properties config = new Properties();
        try (InputStream in = EmailUtil.class.getClassLoader().getResourceAsStream(SMTP_CONFIG_FILE)) {
            if (in != null) {
                config.load(in);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return config;
    }

    private static String getConfig(Properties config, String key, String envKey, String defaultValue) {
        String value = config.getProperty(key);
        if (value != null && !value.trim().isEmpty()) {
            return value.trim();
        }
        value = System.getenv(envKey);
        if (value != null && !value.trim().isEmpty()) {
            return value.trim();
        }
        return defaultValue;
    }

    public static void sendEmail(String toEmail, String subject, String text) {
        Properties config = loadSmtpConfig();

        String host = getConfig(config, "smtp.host", "SMTP_HOST", "smtp.gmail.com");
        String port = getConfig(config, "smtp.port", "SMTP_PORT", "587");
        String auth = getConfig(config, "smtp.auth", "SMTP_AUTH", "true");
        String startTls = getConfig(config, "smtp.starttls", "SMTP_STARTTLS", "true");
        String fromEmail = getConfig(config, "smtp.user", "SMTP_USER", null);
        String password = getConfig(config, "smtp.pass", "SMTP_PASS", null);

        if (fromEmail == null || fromEmail.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            throw new IllegalStateException("Set smtp.user and smtp.pass in smtp.properties or SMTP_USER and SMTP_PASS env vars");
        }

        Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);
        props.put("mail.smtp.auth", auth);
        props.put("mail.smtp.starttls.enable", startTls);

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(fromEmail, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(fromEmail));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject(subject);
            message.setText(text);
            Transport.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send email to " + toEmail, e);
        }
    }
}
