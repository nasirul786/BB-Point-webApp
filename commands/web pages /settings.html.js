/*CMD
  command: settings.html
  help: 
  need_reply: false
  auto_retry_time: 
  folder: web pages 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Jersey+15&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #007bff, #6f42c1);
            color: white;
            display: flex;
            flex-direction: column;
            height: 100vh;
            justify-content: flex-start;
            align-items: center;
        }

        .header {
            font-size: 50px;
            padding-top: 50px;
            background: rgba(0, 0, 0, 0.4);
            letter-spacing: 3px;
            font-family: "Jersey 15";
            text-align: center;
            width: 100%;
            position: fixed;
            top: 0;
            z-index: 1000;
        }

        .form-container {
            width: 90%;
            max-width: 400px;
            margin-top: 190px;
            padding: 20px;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 10px;
        }

        .input-wrapper {
            position: relative;
            width: 100%;
            margin-bottom: 15px;
        }

        .input-wrapper input {
            width: 100%;
            padding: 12px 15px;
            background: rgba(255, 255, 255, 0.9);
            color: #1a73e8;
            border-radius: 8px;
            outline: none;
            border: 2px solid #ff6b6b;
            font-weight: 600;
            font-size: 16px;
            text-align: left;
            padding-left: 40px;
            transition: all 0.3s ease;
            box-shadow: 0 0 0 0 rgba(255, 107, 107, 0);
        }

        .input-wrapper input:focus {
            border-color: #1a73e8;
            outline: none;
            box-shadow: 0 0 10px 3px rgba(26, 115, 232, 0.5);
        }

        .input-wrapper input:hover {
            background: rgba(255, 255, 255, 1);
            border-color: #ff4757;
            box-shadow: 0 0 10px 3px rgba(255, 71, 87, 0.5);
        }

        .input-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
            color: #1a73e8;
        }

        .switch-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
        }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.4s;
            border-radius: 34px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
        }

        input:checked + .slider {
            background-color: #28a745;
        }

        input:checked + .slider:before {
            transform: translateX(26px);
        }

        .login-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: rgba(0, 0, 0, 0.6);
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1001;
        }

        .login-container h2 {
            margin-bottom: 20px;
            font-size: 24px;
        }

        .login-container input {
            width: 80%;
            max-width: 300px;
            padding: 12px 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            border: 2px solid #ff6b6b;
            font-size: 16px;
            text-align: center;
            background: rgba(255, 255, 255, 0.9);
            color: #1a73e8;
        }

        .login-container input:focus {
            border-color: #1a73e8;
            outline: none;
            box-shadow: 0 0 10px 3px rgba(26, 115, 232, 0.5);
        }
    </style>
</head>
<body>
    <div class="header">Settings</div>

    <!-- Login Page -->
    <div class="login-container" id="loginPage">
        <h2>Enter PIN</h2>
        <input id="pin" type="password" placeholder="Enter PIN">
    </div>

    <!-- Settings Page -->
    <div class="form-container" id="settingsPage" style="display: none;">
        <!-- Accept Request Switch -->
        <div class="switch-container">
            <span>Accept Request</span>
            <label class="switch">
                <input id="acceptRequest" type="checkbox">
                <span class="slider"></span>
            </label>
        </div>

        <!-- Transaction Announcement Switch -->
        <div class="switch-container">
            <span>Transaction Announcement</span>
            <label class="switch">
                <input id="transactionAnnounce" type="checkbox">
                <span class="slider"></span>
            </label>
        </div>

        <!-- Webhook Field -->
        <div style="text-align: left; margin-bottom: 5px; font-size: 14px; color: #c1e647;">Webhook URL</div>
        <div class="input-wrapper">
            <i class="fas fa-link input-icon"></i>
            <input id="webhook" type="text" placeholder="Webhook URL" readonly>
            <i id="editWebhook" class="fas fa-pencil" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #1a73e8;"></i>
            <i id="saveWebhook" class="fas fa-save" style="position: absolute; right: 40px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #28a745; display: none;"></i>
        </div>
    </div>

    <script>
        window.Telegram.WebApp.ready();
        const tg = window.Telegram.WebApp;
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=main';
        });
        tg.requestFullscreen();

        const userId = tg.initDataUnsafe.user?.id;
        let pin = "";

        // Configure Telegram MainButton for PIN confirmation
        tg.MainButton.setText("Confirm")
            .setParams({ hasShineEffect: true }) // Add shine effect
            .onClick(() => verifyPin())
            .show();

        function verifyPin() {
            pin = document.getElementById("pin").value.trim();
            if (!pin) {
                tg.showAlert("PIN is required!");
                tg.HapticFeedback.notificationOccurred("error");
                return;
            }

            fetchSettings();
        }

        async function fetchSettings() {
            try {
                const response = await fetch(`https://api.bots.business/v2/bots/<%bot.id%>/web-app/settings?userId=${userId}&pin=${pin}`);
                const data = await response.json();

                if (data.status === "success") {
                    // Render settings
                    document.getElementById("acceptRequest").checked = data.acceptRequest;
                    document.getElementById("transactionAnnounce").checked = data.transactionAnnounce;
                    document.getElementById("webhook").value = data.webhook;

                    // Hide login page and show settings page
                    document.getElementById("loginPage").style.display = "none";
                    document.getElementById("settingsPage").style.display = "block";

                    // Change MainButton to "Add to Homescreen"
                    tg.MainButton.setText("Add to Homescreen")
                        .setParams({ hasShineEffect: true }) // Add shine effect
                        .offClick() // Remove previous click handler
                        .onClick(() => addToHomeScreen()) // Set new click handler
                        .show();
                } else {
                    tg.showAlert(data.msg);
                    tg.HapticFeedback.notificationOccurred("error");
                }
            } catch (error) {
                tg.showAlert("Failed to fetch settings.");
                tg.HapticFeedback.notificationOccurred("error");
            }
        }

        // Toggle switches and send updates
        document.getElementById("acceptRequest").addEventListener("change", async (e) => {
            const acceptRequest = e.target.checked;
            await updateSetting({ acceptRequest });
        });

        document.getElementById("transactionAnnounce").addEventListener("change", async (e) => {
            const transactionAnnounce = e.target.checked;
            await updateSetting({ transactionAnnounce });
        });

        // Webhook edit and save
        document.getElementById("editWebhook").addEventListener("click", () => {
            const webhookInput = document.getElementById("webhook");
            webhookInput.removeAttribute("readonly");
            document.getElementById("saveWebhook").style.display = "block";
        });

        document.getElementById("saveWebhook").addEventListener("click", async () => {
            const newWebhook = document.getElementById("webhook").value.trim();
            if (!newWebhook) {
                tg.showAlert("Webhook URL cannot be empty!");
                tg.HapticFeedback.notificationOccurred("error");
                return;
            }

            await updateSetting({ newWebhook });
            document.getElementById("webhook").setAttribute("readonly", true);
            document.getElementById("saveWebhook").style.display = "none";
        });

        async function updateSetting(data) {
            try {
                const response = await fetch(`https://api.bots.business/v2/bots/<%bot.id%>/web-app/update-settings`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, pin, ...data })
                });

                const result = await response.json();
                if (result.status === "success") {
                    tg.showAlert(result.msg);
                    tg.HapticFeedback.notificationOccurred("success");
                    fetchSettings(); // Re-fetch settings without refreshing the page
                } else {
                    tg.showAlert(result.msg);
                    tg.HapticFeedback.notificationOccurred("error");
                }
            } catch (error) {
                tg.showAlert("Failed to update settings.");
                tg.HapticFeedback.notificationOccurred("error");
            }
        }

        // Add to Homescreen using Telegram method
        function addToHomeScreen() {
            tg.addToHomeScreen();
            tg.showAlert("Added to homescreen!");
            tg.HapticFeedback.notificationOccurred("success");
        }
    </script>
</body>
</html>
