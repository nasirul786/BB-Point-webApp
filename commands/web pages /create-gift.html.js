/*CMD
  command: create-gift.html
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
    <title>Create Gift</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Jersey+15&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background: linear-gradient(135deg, #007bff, #6f42c1);
            color: white;
            display: flex;
            flex-direction: column;
            height: 100vh;
            justify-content: flex-start; /* Align content to the top */
            align-items: center;
            margin: 0;
            padding: 0;
        }

        .header {
            font-size: 50px;
            padding-top: 40px;
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
            padding-left: 40px; /* Space for icons */
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
            color: #1a73e8;
            font-size: 18px;
        }

        .btn-custom {
            background: linear-gradient(135deg, #ff416c, #ff4b2b);
            color: white;
            font-size: 20px;
            padding: 12px 25px;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: bold;
            width: 100%;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
        }

        .btn-custom:disabled {
            background: gray;
            cursor: not-allowed;
        }

        .btn-custom:hover {
            background: linear-gradient(135deg, #ff4b2b, #ff416c);
            transform: translateY(-2px);
        }

        .toggle-buttons {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }

        .toggle-btn {
            padding: 10px 20px;
            font-size: 18px;
            font-weight: bold;
            border: none;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            margin: 5px;
            border-radius: 10px;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px; /* Space between text and spinner */
        }

        .toggle-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .fa-spinner {
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .add-password-btn {
            margin: 10px;
            background: none;
            border: none;
            color: yellow;
            font-size: 16px;
            cursor: pointer;
            text-decoration: none;
        }

        .pin-popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            padding-top: 60px;
            border-radius: 12px;
            text-align: center;
            width: 350px;
            height: 300px;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
        }

        .pin-popup .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 25px;
            cursor: pointer;
            color: #ff4b2b;
            background: none;
            border: none;
        }

        .pin-popup .pin-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .pin-popup .pin-input {
            font-size: 24px;
            padding: 8px;
            text-align: center;
            border-radius: 5px;
            border: 2px solid rgba(252, 3, 19, 0.3);
            width: 100%;
            outline: none;
            margin-bottom: 15px;
            background-color: rgba(0, 0, 0, 0.5);
            color: #a32cc4;
            font-weight: bold;
        }

        .pin-popup .confirm-btn:hover {
            background: linear-gradient(135deg, #ff4b2b, #ff416c);
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

        .success-popup .details {
            text-align: left;
            margin-top: 15px;
        }

        .success-popup .details p {
            margin: 10px 0;
            font-size: 16px;
        }

        .success-popup .copy-icon {
            cursor: pointer;
            margin-left: 10px;
            color: #ff4b2b;
            font-size: 18px;
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
    </style>
</head>
<body>
    <div class="header">Create Gift</div>

    <div class="form-container">
        <div class="input-wrapper">
            <i class="fas fa-coins input-icon"></i>
            <input id="amount" type="number" placeholder="Enter Amount">
        </div>

        <div class="input-wrapper">
            <i class="fas fa-heading input-icon"></i>
            <input id="title" type="text" placeholder="Gift Title">
        </div>

        <div class="input-wrapper">
            <i class="fas fa-sticky-note input-icon"></i>
            <input id="note" type="text" placeholder="Gift Note">
        </div>

        <div class="input-wrapper">
            <i class="fas fa-users input-icon"></i>
            <input id="totalUser" type="number" placeholder="Total Users">
        </div>

        <div id="passwordField" style="display: none;">
            <div class="input-wrapper">
                <i class="fas fa-lock input-icon"></i>
                <input id="createPassword" type="password" placeholder="Enter Password">
                <i class="fas fa-eye eye-icon" onclick="togglePasswordVisibility('createPassword')" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #6f42c1;"></i>
            </div>
        </div>

        <button class="add-password-btn" id="addPasswordBtn" onclick="togglePasswordField()">+ Add Password</button>
        <button class="btn-custom" onclick="openPinPopup()">Continue</button>
    </div>

    <div class="toggle-buttons">
        <button id="claimGiftBtn" class="toggle-btn" onclick="openClaimGiftPage()">
            <span>Claim Gift</span>
            <i id="claimGiftSpinner" class="fas fa-spinner" style="display: none;"></i>
        </button>
    </div>

    <div class="pin-popup" id="pinPopup">
        <button class="close-btn" onclick="closePinPopup()">&times;</button>
        <p class="pin-title">Enter PIN to Confirm</p>
        <input type="password" id="pin" class="pin-input" maxlength="6">
        <button class="btn btn-danger w-100 mt-2" onclick="createGift()">Confirm</button>
    </div>

    <div class="success-popup" id="successPopup">
        <span class="close-btn" onclick="closeSuccessPopup()"><i class="fas fa-times"></i></span>
        <p>🎁 Gift successfully created!</p>
        <div class="details" id="giftDetails">
            <!-- Gift details will be dynamically inserted here -->
        </div>
        <button onclick="goBack()">Back</button>
    </div>

    <script>
        window.Telegram.WebApp.ready();
        const tg = window.Telegram.WebApp;
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=main';
        });
        tg.requestFullscreen();

        function togglePasswordVisibility(inputId) {
            const passwordInput = document.getElementById(inputId);
            const eyeIcon = passwordInput.nextElementSibling;
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                passwordInput.type = "password";
                eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
            }
        }

        function togglePasswordField() {
            const passwordField = document.getElementById("passwordField");
            const addPasswordBtn = document.getElementById("addPasswordBtn");
            if (passwordField.style.display === "none") {
                passwordField.style.display = "block";
                addPasswordBtn.textContent = "Remove Password";
            } else {
                passwordField.style.display = "none";
                addPasswordBtn.textContent = "+ Add Password";
            }
        }

        function openPinPopup() {
            const amount = document.getElementById("amount").value;
            const title = document.getElementById("title").value;
            const note = document.getElementById("note").value;
            const totalUser = document.getElementById("totalUser").value;
            const password = document.getElementById("createPassword")?.value || "";

            if (!amount || !title || !totalUser) {
                tg.showAlert("Please fill all required fields.");
                tg.HapticFeedback.impactOccurred("medium");
                return;
            }

            // Show the PIN popup
            document.getElementById("pinPopup").style.display = "block";
        }

        function closePinPopup() {
            document.getElementById("pinPopup").style.display = "none";
        }

        async function createGift() {
            const userId = tg.initDataUnsafe.user?.id;
            const amount = document.getElementById("amount").value;
            const title = document.getElementById("title").value;
            const note = document.getElementById("note").value;
            const totalUser = document.getElementById("totalUser").value;
            const password = document.getElementById("createPassword")?.value || "";
            const pin = document.getElementById("pin").value;

            const response = await fetch("https://api.bots.business/v2/bots/<%bot.id%>/web-app/create-gift", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, amount, title, note, totalUser, password, pin })
            });

            const data = await response.json();
            if (data.status && data.status === "success") {
                showSuccessPage(data);
                closePinPopup();
                tg.HapticFeedback.impactOccurred("medium");
            } else {
                tg.showAlert(data.msg);
                closePinPopup();
                tg.HapticFeedback.impactOccurred("medium");
            }
        }

        function showSuccessPage(data) {
            const successPopup = document.getElementById("successPopup");
            const giftDetails = document.getElementById("giftDetails");

            giftDetails.innerHTML = `
                <p><strong>Gift Code:</strong> ${data.giftDetails.giftCode} <i class="fas fa-copy copy-icon" onclick="copyToClipboard('${data.giftDetails.giftCode}')"></i></p>
                <p><strong>Title:</strong> ${data.giftDetails.title}</p>
                <p><strong>Description:</strong> ${data.giftDetails.description}</p>
                <p><strong>Total Users:</strong> ${data.giftDetails.totalUsers}</p>
                <p><strong>Prize Per User:</strong> ${data.giftDetails.prizePerUser}</p>
                <p><strong>Total Amount:</strong> ${data.giftDetails.totalAmount}</p>
                <p><strong>Created By:</strong> ${data.giftDetails.createdBy}</p>
                <p><strong>Password:</strong> ${data.giftDetails.password}</p>
            `;

            successPopup.style.display = "block";
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                tg.showAlert("Copied to clipboard!");
                tg.HapticFeedback.impactOccurred("medium");
            });
        }

        function closeSuccessPopup() {
            document.getElementById("successPopup").style.display = "none";
        }

        function goBack() {
            window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=main';
        }

        function openClaimGiftPage() {
            const claimGiftBtn = document.getElementById("claimGiftBtn");
            const claimGiftSpinner = document.getElementById("claimGiftSpinner");

            // Disable the button and show the spinner
            claimGiftBtn.disabled = true;
            claimGiftSpinner.style.display = "inline-block";

            // Redirect to the Claim Gift page after a short delay
            setTimeout(() => {
                window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=claim_gift';
            }, 10); // 10ms delay to show the spinner
        }
    </script>
</body>
</html>
