public class SendEmail {

    public static void sendMail(String toEmail, String subject, String messageText) {
        EmailUtil.sendEmail(toEmail, subject, messageText);
    }
}
