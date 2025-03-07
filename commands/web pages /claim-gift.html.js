/*CMD
  command: claim-gift.html
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
    <title>Claim Gift</title>
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
            justify-content: flex-start;
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
            gap: 10px;
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
    </style>
</head>
<body>
    <div class="header">Claim Gift</div>

    <div class="form-container">
        <div class="input-wrapper">
            <i class="fas fa-gift input-icon"></i>
            <input id="giftCode" type="text" placeholder="Enter Gift Code">
        </div>

        <div class="input-wrapper">
            <i class="fas fa-lock input-icon"></i>
            <input id="claimPassword" type="password" placeholder="Password (Optional)">
            <i class="fas fa-eye eye-icon" onclick="togglePasswordVisibility('claimPassword')" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #6f42c1;"></i>
        </div>

        <button id="claimBtn" class="btn-custom" onclick="claimGift()">Claim Gift</button>
    </div>

    <div class="toggle-buttons">
        <button id="createGiftBtn" class="toggle-btn" onclick="openCreateGiftPage()">
            <span>Create Gift</span>
            <i id="createGiftSpinner" class="fas fa-spinner" style="display: none;"></i>
        </button>
    </div>

    <div id="successPopup" class="success-popup">
        <span class="close-btn" onclick="closeSuccessPopup()"><i class="fas fa-times"></i></span>
        <p id="successMessage"></p>
        <div class="details" id="claimDetails">
            <!-- Claim details will be dynamically inserted here -->
        </div>
        <button class="btn btn-danger w-75 mt-2" onclick="closeSuccessPopup()">Close</button>
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

        async function claimGift() {
            const userId = tg.initDataUnsafe.user?.id;
            const giftCode = document.getElementById("giftCode").value;
            const password = document.getElementById("claimPassword").value;

            if (!giftCode) {
                tg.HapticFeedback.notificationOccurred("error");
                return tg.showAlert("Gift Code is required!");
            }

            const response = await fetch("https://api.bots.business/v2/bots/<%bot.id%>/web-app/claim-gift", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ giftCode, userId, password })
            });

            const data = await response.json();
            if (data.status === "success") {
                tg.HapticFeedback.notificationOccurred("success");
                showSuccessPopup(data);
            } else {
                tg.showAlert(data.msg);
                tg.HapticFeedback.impactOccurred("medium");
            }
        }

        function showSuccessPopup(data) {
            const successPopup = document.getElementById("successPopup");
            const successMessage = document.getElementById("successMessage");
            const claimDetails = document.getElementById("claimDetails");

            successMessage.textContent = data.msg;
            claimDetails.innerHTML = `
                <p><strong>Gift Code:</strong> ${data.claimDetails.giftCode} <i class="fas fa-copy copy-icon" onclick="copyToClipboard('${data.claimDetails.giftCode}')"></i></p>
                <p><strong>Title:</strong> ${data.claimDetails.title}</p>
                <p><strong>Description:</strong> ${data.claimDetails.description}</p>
                <p><strong>Amount Received:</strong> ${data.claimDetails.amountReceived}</p>
                <p><strong>Total Users:</strong> ${data.claimDetails.totalUsers}</p>
                <p><strong>Remaining Claims:</strong> ${data.claimDetails.remainingClaims}</p>
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

        function openCreateGiftPage() {
            const createGiftBtn = document.getElementById("createGiftBtn");
            const createGiftSpinner = document.getElementById("createGiftSpinner");

            // Disable the button and show the spinner
            createGiftBtn.disabled = true;
            createGiftSpinner.style.display = "inline-block";

            // Redirect to the Create Gift page after a short delay
            setTimeout(() => {
                window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=create_gift';
            }, 10); // 10ms delay to show the spinner
        }
    </script>
</body>
</html>
