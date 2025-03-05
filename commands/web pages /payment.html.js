/*CMD
  command: payment.html
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
    <title>Send Payment</title>
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
            margin-top: 130px;
            font-size: 20px;
            color: white;
        }

        .title {
            margin-top: 10px;
            font-size: 30px;
            font-weight: bold;
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
        }

        .btn-custom:disabled {
            background: gray;
            cursor: not-allowed;
        }

        .btn-custom:hover {
            background: linear-gradient(135deg, #ff4b2b, #ff416c);
            transform: translateY(-2px);
        }

        .qr-btn {
            background: white;
            border: none;
            cursor: pointer;
            font-family: "Jersey 15";
            opacity: 80%;
            font-size: 28px;
            padding: 5px;
            border-radius: 15px;
            margin: 10px;
            margin-left: 20%;
            width: 60%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .qr-btn img {
            width: 30px; 
            height: 30px; 
        }

        .qr-btn:hover {
            transform: scale(1.05);
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

        .success-popup .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 20px;
            color: #ff4b2b;
            cursor: pointer;
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
    <div class="header">Send Payment</div>

    <div class="info">You can get your own QR code by sending <span class="highlight">/myQr</span> on our official bot</div>

    <div class="title" id="paymentTitle"></div> <!-- Title moved below info -->

    <div class="form-container">
        <div class="input-wrapper">
            <i class="fas fa-user input-icon"></i>
            <input type="number" id="toUser" placeholder="Enter User ID">
        </div>

        <div class="input-wrapper">
            <i class="fas fa-coins input-icon"></i>
            <input type="number" id="amount" placeholder="Enter Amount">
        </div>

        <div class="input-wrapper">
            <i class="fas fa-sticky-note input-icon"></i>
            <input type="text" id="note" placeholder="Note (Optional)">
        </div>

        <button class="qr-btn" onclick="scanQRCode()">
            <img src="https://i.ibb.co/xSX9Fn9h/3035359.png" alt="Scan QR"> Scan QR
        </button>

        <button class="btn-custom" id="sendPayment" onclick="openPinPopup()" disabled>Send Payment</button>
    </div>

    <div id="pinPopup" class="pin-popup">
        <span class="close-btn" onclick="closePinPopup()"><i class="fas fa-times"></i></span>
        <p class="pin-title">Enter PIN And Confirm</p>
        <input id="pin" class="pin-input" type="password" maxlength="6">
        <button class="btn btn-danger w-100 mt-2" onclick="sendPayment()">Confirm</button>
    </div>

    <div id="successPopup" class="success-popup">
        <span class="close-btn" onclick="closeSuccessPopup()"><i class="fas fa-times"></i></span>
        <p id="successMessage"></p>
        <button class="btn btn-danger w-75 mt-2" onclick="window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=main'">Back</button>
    </div>

    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <script>
        window.Telegram.WebApp.ready();
        const tg = window.Telegram.WebApp;
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=main';
        });
        tg.requestFullscreen();

        let userId = tg.initDataUnsafe.user?.id;
        const urlParams = new URLSearchParams(window.location.search);
        const scan = urlParams.get("scan");

        document.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", () => {
                validateForm();
            });
        });

        function validateForm() {
            const toUser = document.getElementById("toUser").value;
            const amount = document.getElementById("amount").value;
            const invoiceId = urlParams.get("invoiceId");

            // If invoiceId is present, enable the button immediately
            if (invoiceId) {
                document.getElementById("sendPayment").disabled = false;
            } else {
                // Otherwise, check if toUser and amount are filled
                document.getElementById("sendPayment").disabled = !(toUser && amount);
            }
        }

        function scanQRCode() {
            tg.showScanQrPopup({ text: "Scan Payment QR" }, (result) => {
                try {
                    let qrData = JSON.parse(result);

                    // Check if QR code has either userId or invoiceId
                    if (!qrData.userId && !qrData.invoiceId) {
                        tg.closeScanQrPopup();
                        tg.showAlert("Invalid QR Code: Missing userId or invoiceId");
                        tg.HapticFeedback.impactOccurred("medium");
                        return;
                    }

                    // If invoiceId is present, ignore other fields and enable the button
                    if (qrData.invoiceId) {
                        openPinPopup();
                        urlParams.set("invoiceId", qrData.invoiceId);
                        document.getElementById("sendPayment").disabled = false;
                        tg.closeScanQrPopup();
                        tg.HapticFeedback.notificationOccurred("success");
                        return;
                    }

                    // Populate fields if userId is present
                    if (qrData.userId) {
                        document.getElementById("toUser").value = qrData.userId;
                        document.getElementById("paymentTitle").textContent = qrData.title || "";
                        tg.closeScanQrPopup();
                        tg.HapticFeedback.notificationOccurred("success");
                        if (qrData.amount) {
                            document.getElementById("amount").value = qrData.amount;
                            document.getElementById("amount").setAttribute("readonly", true);
                        }
                        if (qrData.note) {
                            document.getElementById("note").value = qrData.note;
                            document.getElementById("note").setAttribute("readonly", true);
                        }
                    }

                    validateForm();
                } catch (e) {
                    tg.closeScanQrPopup();
                    tg.showAlert("Invalid QR Code Format");
                    tg.HapticFeedback.impactOccurred("medium");
                }
            });
        }

        if (scan === "true") {
            scanQRCode();
        }

        function openPinPopup() {
            document.getElementById("pinPopup").style.display = "block";
        }

        function closePinPopup() {
            document.getElementById("pinPopup").style.display = "none";
        }

        async function sendPayment() {
            closePinPopup();
            const pin = document.getElementById("pin").value;
            const toUser = document.getElementById("toUser").value;
            const amount = document.getElementById("amount").value;
            const note = document.getElementById("note").value;
            const invoiceId = urlParams.get("invoiceId");

            let body;
            if (invoiceId) {
                // If invoiceId is present, send only invoiceId, userId, and pin
                body = { invoiceId, fromUser: userId, pin };
            } else {
                // If no invoiceId, send toUser, fromUser, amount, note, and pin
                if (!toUser || !amount || !pin) {
                    tg.showAlert("Please fill all required fields: User ID, Amount, and PIN");
                    tg.HapticFeedback.impactOccurred("medium");
                    return;
                }
                body = { toUser, fromUser: userId, amount, note, pin };
            }

            let response = await fetch("https://api.bots.business/v2/bots/<%bot.id%>/web-app/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            let data = await response.json();
            if (data.status === "success") {
                document.getElementById("successMessage").textContent = data.msg;
                document.getElementById("successPopup").style.display = "block";
            } else {
                tg.showAlert(data.msg);
                tg.HapticFeedback.impactOccurred("medium");
            }
        }

        function closeSuccessPopup() {
            document.getElementById("successPopup").style.display = "none";
        }
    </script>
</body>
</html>
