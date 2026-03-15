// Request permission for notifications
Notification.requestPermission().then((permission) => {

  if (permission === "granted") {
    console.log("Notification permission granted.");

    // Get Firebase messaging object
    const messaging = firebase.messaging();

    // Get device token
    messaging.getToken({
      vapidKey: "BL2RtIrl7OyfM-kx5Tt3JLwPzNUKShLhONV_MLjLedY7u8rLLdw92iC1o4o-TGhqrTnaiD8Zanwza8kOUNRoGpY"
    }).then((currentToken) => {

      if (currentToken) {
        console.log("Device Token:", currentToken);

        // Later you will send this token to backend
        // Example:
        // fetch("/saveToken", { method: "POST", body: currentToken });

      } else {
        console.log("No registration token available.");
      }

    }).catch((err) => {
      console.log("Error getting token:", err);
    });

  } else {
    console.log("Notification permission denied.");
  }

});