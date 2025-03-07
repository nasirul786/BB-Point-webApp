/*CMD
  command: buy.html
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"">
    <title>Buy BBP</title>
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

        .info {
            margin-top: 190px;
            font-size: 20px;
            margin-left: 25px;
            margin-right: 25px;
            color: white;
        }

        .form-container {
            width: 90%;
            max-width: 400px;
            margin-top: 20px;
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
        }

        .input-icon.star {
            color: rgb(230, 199, 0); /* Star icon color */
        }

        .input-icon.user {
            color: #1a73e8; /* User icon color */
        }

        .btn-custom {
            background: linear-gradient(135deg, #ff416c, #ff4b2b);
            color: white;
            font-size: 20px;
            padding: 12px 20px;
            border: none;
            margin-top: 15px;
            margin-bottom: 15px;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: bold;
            width: 100%;
        }

        .btn-custom:disabled {
            background: gray;
            cursor: not-allowed;
        }

        .btn-custom:hover {
            background: linear-gradient(135deg, #ff4b2b, #ff416c);
            transform: translateY(-2px);
        }

        .warning {
            font-size: 16px;
            color: #ff6b6b;
            margin-top: 10px;
            display: none; /* Hidden by default */
        }

        .success-popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            width: 350px;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
        }

        .success-popup .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 20px;
            color: #ff4b2b;
            cursor: pointer;
        }

        .success-popup h2 {
            margin-bottom: 20px;
        }

        .success-popup button {
            background: #ff4b2b;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 15px;
        }
        .toggle-link {
            color: #eb3a34;
            font-weight: bold;
            text-decoration: none;
        }

        .success-popup button:hover {
            background: #ff6b6b;
        }

        .highlight {
            color: #c1e647;
            font-weight: bold;
            padding: 2px 6px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="header">Buy BBP</div>

    <div class="info">Convert stars to BBP at a rate of<br> <span class="highlight">1 star = 2 BBP</span>.</div>

    <div class="form-container">
        <div id="userIdField" class="input-wrapper" style="display: none;">
            <i class="fas fa-user input-icon user"></i>
            <input id="userId" type="text" placeholder="Enter User ID" oninput="validateFields()">
        </div>

        <div class="input-wrapper">
            <i class="fas fa-star input-icon star"></i>
            <input id="stars" type="number" placeholder="Enter Stars" min="1" max="1000" oninput="validateFields(); calculateBBP();">
        </div>

        <div id="warning" class="warning">
            If you're buying for someone else, ensure the User ID is correct. Stars cannot be refunded!
        </div>

        <button class="btn-custom" id="buyBtn" disabled>Buy 0 BBP</button>
        <a id="toggleBuyForOther" class="toggle-link" onclick="toggleBuyForOther()">Buy for Other</a>
    </div>

    <div id="successPopup" class="success-popup">
        <span class="close-btn" onclick="closeSuccessPopup()"><i class="fas fa-times"></i></span>
        <h2>🎉 Thank You!</h2>
        <p id="successMessage"></p>
        <button onclick="goBack()">Back</button>
        <button onclick="buyMore()">Buy More</button>
    </div>

    <script>
        window.Telegram.WebApp.ready();
        const tg = window.Telegram.WebApp;
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
           tg.HapticFeedback.impactOccurred("medium");
            window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=main';
        });
        tg.requestFullscreen();

        let buyingForOther = false;

        function toggleBuyForOther() {
            buyingForOther = !buyingForOther;
            document.getElementById('userIdField').style.display = buyingForOther ? 'block' : 'none';
            document.getElementById('warning').style.display = buyingForOther ? 'block' : 'none'; // Show/hide warning
            document.getElementById('toggleBuyForOther').textContent = buyingForOther ? 'Buy for Me' : 'Buy for Other';
            validateFields();
        }

        function calculateBBP() {
            const stars = document.getElementById("stars").value.trim();
            const bbp = stars * 2;
            document.getElementById("buyBtn").textContent = `Buy ${bbp || 0} BBP`;
            validateFields();
        }

        function validateFields() {
            const stars = document.getElementById("stars").value.trim();
            const userId = document.getElementById("userId").value.trim();
            const isValid = stars >= 1 && stars <= 1000 && (!buyingForOther || userId);
            document.getElementById("buyBtn").disabled = !isValid;
        }

        async function buyBBP() {
            const stars = parseInt(document.getElementById("stars").value.trim());
            const amount = stars;
            const userId = buyingForOther ? document.getElementById("userId").value.trim() : Telegram.WebApp.initDataUnsafe.user.id;

            try {
                const response = await fetch(`https://api.bots.business/v2/bots/<%bot.id%>/web-app/buyLink?userId=${userId}&amount=${amount}`);
                const data = await response.json();

                if (data.status === "success" && data.link) {
                    Telegram.WebApp.openInvoice(data.link);

                    Telegram.WebApp.onEvent('invoiceClosed', (event) => {
                        if (event.status === "paid") {
                            tg.HapticFeedback.notificationOccurred("success");
                            showSuccessPopup(amount * 2);
                        } else if (event.status === "cancelled") {
                            tg.HapticFeedback.notificationOccurred("error");
                            Telegram.WebApp.showAlert("❌ Payment cancelled.");
                        } else if (event.status === "failed") {
                            tg.HapticFeedback.notificationOccurred("error");
                            Telegram.WebApp.showAlert("⚠️ Payment failed.");
                        }
                    });
                } else {
                    Telegram.WebApp.HapticFeedback.notificationOccurred("error");
                    Telegram.WebApp.showAlert(data.msg || "Unexpected response from server.");
                }
            } catch (error) {
                Telegram.WebApp.HapticFeedback.notificationOccurred("error");
                Telegram.WebApp.showAlert("⚠️ Failed to connect to server.");
            }
        }

        function showSuccessPopup(amount) {
            document.getElementById("successMessage").textContent = `You have successfully purchased ${amount} BBP!`;
            document.getElementById("successPopup").style.display = "block";
        }

        function closeSuccessPopup() {
            document.getElementById("successPopup").style.display = "none";
        }

        function goBack() {
            window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=main';
        }

        function buyMore() {
            document.getElementById("successPopup").style.display = "none";
            document.getElementById("stars").value = '';
            document.getElementById("userId").value = '';
            calculateBBP();
            validateFields();
        }

        document.getElementById("buyBtn").addEventListener("click", buyBBP);
    </script>
</body>
</html>
