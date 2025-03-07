/*CMD
  command: request.html
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
    <title>Request Payment</title>
    
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
        }

        .header {
            background: rgba(0, 0, 0, 0.3);
            padding: 15px;
            padding-top: 50px;
            font-size: 50px;
            letter-spacing: 3px;
            font-family: "Jersey 15";
        }

        .input-container {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 15px;
            width: 80%;
            position: fixed;
            top: 25%;
            left: 8%;
            margin-top: 20px;
            margin: auto;
        }

        .amount-input {
            font-size: 70px;
            background: transparent;
            border: none;
            text-align: center;
            color: white;
            width: 100%;
            outline: none;
            font-weight: bold;
        }

        .amount-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .field {
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

        .field:focus {
            border-color: #1a73e8;
            outline: none;
            box-shadow: 0 0 10px 3px rgba(26, 115, 232, 0.5);
        }

        .field:hover {
            background: rgba(255, 255, 255, 1);
            border-color: #ff4757;
            box-shadow: 0 0 10px 3px rgba(255, 71, 87, 0.5);
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
            width: 80%;
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

        .pin-popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            background-color: rgba(0, 0, 0, 0.9);
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
        }

        .pin-input {
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

        .pin-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
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

        .input-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #1a73e8;
            font-size: 18px;
        }

        .input-wrapper {
            position: relative;
            width: 100%;
        }

        .loading-spinner {
            display: none;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #ff4b2b;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="header">BBP Request</div>

    <div class="input-container">
        <input id="amount" class="amount-input" type="number" placeholder="0" oninput="validateFields()">
        
        <div class="input-wrapper">
            <i class="fas fa-user input-icon"></i>
            <input id="toUserId" class="field" type="number" placeholder="User ID" oninput="validateFields()">
        </div>

        <div class="input-wrapper">
            <i class="fas fa-sticky-note input-icon"></i>
            <input id="note" class="field" type="text" placeholder="Note (optional)">
        </div>

        <button id="requestBtn" class="btn-custom" onclick="showPinPopup()" disabled>Request Payment</button>
    </div>

    <div id="pinPopup" class="pin-popup">
        <span class="close-btn" onclick="closePinPopup()"><i class="fas fa-times"></i></span>
        <p class="pin-title">Enter PIN</p>
        <input id="pin" class="pin-input" type="password" maxlength="6">
        <button class="btn btn-danger w-100 mt-2" onclick="submitPayment()">Confirm</button>
        <div id="loadingSpinner" class="loading-spinner"></div>
    </div>

    <div id="successPopup" class="success-popup">
        <span class="close-btn" onclick="closeSuccessPopup()"><i class="fas fa-times"></i></span>
        <p>✅ Payment request successful!</p>
        <div class="details">
            <p><strong>Request ID:</strong> <span id="requestId"></span> <i class="fas fa-copy copy-icon" onclick="copyRequestId()"></i></p>
            <p><strong>Amount:</strong> <span id="successAmount"></span></p>
            <p><strong>User ID:</strong> <span id="successUserId"></span></p>
            <p><strong>Note:</strong> <span id="successNote"></span></p>
        </div>
        <button onclick="goBack()">Back</button>
    </div>

    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <script>
        window.Telegram.WebApp.ready();
        const tg = Telegram.WebApp;
        tg.requestFullscreen();
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
           tg.HapticFeedback.impactOccurred("medium");
            window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=main';
        });

        // Get the requester's ID from Telegram WebApp init data
        const requesterId = tg.initDataUnsafe.user?.id;

        // Validate form fields
        function validateFields() {
            const amount = document.getElementById("amount").value.trim();
            const toUserId = document.getElementById("toUserId").value.trim();
            document.getElementById("requestBtn").disabled = !(amount && toUserId);
        }

        // Show the PIN popup
        function showPinPopup() {
            document.getElementById("pinPopup").style.display = "block";
        }

        // Close the PIN popup
        function closePinPopup() {
            document.getElementById("pinPopup").style.display = "none";
        }

        // Submit the payment request
        async function submitPayment() {
            const amount = document.getElementById('amount').value.trim();
            const toUserId = document.getElementById('toUserId').value.trim();
            const note = document.getElementById('note').value.trim();
            const pin = document.getElementById('pin').value.trim();

            if (!pin) {
                return tg.showAlert("PIN is required!");
            }

            // Show loading spinner
            document.getElementById("loadingSpinner").style.display = "block";

            const payload = {
                userId: toUserId, // Recipient's user ID
                requesterId, // Current user's ID (from init data)
                amount,
                note,
                pin
            };

            try {
                const res = await fetch("https://api.bots.business/v2/bots/<%bot.id%>/web-app/request", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();

                if (data.status === "success") {
                    // Show success popup with details
                    document.getElementById("requestId").textContent = data.requestId;
                    document.getElementById("successAmount").textContent = data.amount;
                    document.getElementById("successUserId").textContent = data.userId;
                    document.getElementById("successNote").textContent = data.note || "No note provided";
                    document.getElementById("successPopup").style.display = "block";
                    document.getElementById("pinPopup").style.display = "none";
                } else {
                    tg.showAlert(data.msg);
                }
            } catch (err) {
                tg.showAlert("Payment request failed!");
            } finally {
                // Hide loading spinner
                document.getElementById("loadingSpinner").style.display = "none";
            }
        }

        // Copy Request ID to clipboard
        function copyRequestId() {
            const requestId = document.getElementById("requestId").textContent;
            navigator.clipboard.writeText(requestId).then(() => {
                tg.showAlert("Request ID copied to clipboard!");
            });
        }

        // Close the success popup
        function closeSuccessPopup() {
            document.getElementById("successPopup").style.display = "none";
        }

        // Go back to the main app
        function goBack() {
            window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=main';
        }
    </script>
</body>
</html>
