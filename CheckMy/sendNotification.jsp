<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Send Notification</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h2>Send Notification to Users</h2>

    <form action="SendNotificationServlet" method="post">
        Subject<br>
        <input type="text" name="subject" required>

        <br><br>

        Message<br>
        <textarea name="message" rows="6" cols="40" required></textarea>

        <br><br>

        <button type="submit">Send Email</button>
    </form>
</body>
</html>
