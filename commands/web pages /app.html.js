/*CMD
  command: app.html
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
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Homepage</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Jersey+15&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background: linear-gradient(135deg, #007bff, #6f42c1);
            color: white;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        .header {
            font-size: 50px;
            padding-top: 65px;
            background: rgba(0, 0, 0, 0.4);
            letter-spacing: 3px;
            font-family: "Jersey 15";
            text-align: center;
            width: 100%;
        }

        .balance {
            margin-top: 50px;
            font-size: 30px;
            font-weight: bold;
        }

        .button-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 4px;
            margin-top: 20px;
            padding: 10px;
            background: rgba(240, 242, 245, 0.2);
            border-radius: 10px;
            margin: 20px;
        }

        .button-row {
            display: flex;
            justify-content: center;
            gap: 0px;
            margin: -18px;
            width: 100%;
        }

        .button {
            background: none;
            border: none;
            padding: 15px;
            width: 100px;
            height: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
        }

        .button:hover {
            transform: scale(1.1);
        }

        .button img {
            width: 40px;
            height: 40px;
        }

        .button span {
            margin-top: 5px;
            font-size: 14px;
        }

        .transaction-list {
            flex-grow: 1;
            margin-top: -5px;
            overflow-y: auto;
            padding: 20px;
        }

        .transaction-item {
            background-color: rgba(0, 0, 0, 0.5);
            margin: 10px 0;
            padding: 15px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .transaction-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: white;
            margin-right: 15px;
        }

        .credit-icon {
            background-color: #28a745;
        }

        .debit-icon {
            background-color: #dc3545;
        }

        .transaction-details {
            flex-grow: 1;
            text-align: left;
        }

        .transaction-details span {
            display: block;
            font-size: 14px;
        }

        .transaction-details .line {
            border-top: 1px solid white;
            margin: 5px 0;
            margin-right: 50px;
        }

        .transaction-amount {
            font-size: 20px;
            font-weight: bold;
        }

        .transaction-amount.credit {
            color: #28a745;
        }

        .transaction-amount.debit {
            color: #dc3545;
        }

        .no-transactions {
            display: none;
            flex-direction: column;
            align-items: center;
            padding-bottom: 80%;
            margin-top: 20px;
        }

        .no-transactions img {
            width: 80%;
            max-width: 300px;
        }

        .qr-popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            width: 300px;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
        }

        .qr-popup img {
            width: 100%;
            margin-bottom: 15px;
        }

        .qr-popup button {
            background: #ff4b2b;
            color: white;
            border: none;
            padding: 5px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 22px;
            margin: 5px;
        }

        .qr-popup button:hover {
            background: #ff416c;
        }
    </style>
</head>
<body>
    <div class="header">BBP App</div>
    <div id="balance" class="balance">💎 0 BBP</div>

    <div class="button-container">
        <div class="button-row">
            <div class="button" onclick="haptic(); window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=pay&scan=false'">
                <img src="https://logicalhuman.link/bbp/send.svg" alt="Send">
                <span>Send</span>
            </div>
            <div class="button" onclick="haptic(); window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=request'">
                <img src="https://logicalhuman.link/bbp/request.svg" alt="Request">
                <span>Request</span>
            </div>
            <div class="button" onclick="haptic(); showQRPopup()">
                <img src="https://logicalhuman.link/bbp/qr-code.svg" alt="My QR">
                <span>My QR</span>
            </div>
        </div>
        <div class="button-row">
            <div class="button" onclick="haptic(); window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=pay&scan=true'">
                <img src="https://logicalhuman.link/bbp/qr-scanner.svg" alt="Scan QR">
                <span>Scan QR</span>
            </div>
            <div class="button" onclick="haptic(); window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=buy'">
                <img src="https://logicalhuman.link/bbp/buy.svg" alt="Buy BBP">
                <span>Buy BBP</span>
            </div>
            <div class="button" onclick="haptic(); window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=claim_gift'">
                <img src="https://logicalhuman.link/bbp/gift.svg" alt="Gifts">
                <span>Gifts</span>
            </div>
        </div>
    </div>

    <div id="transactionList" class="transaction-list"></div>
    <div id="noTransactions" class="no-transactions">
        <img src="https://cdni.iconscout.com/illustration/free/thumb/free-payment-error-illustration-download-in-svg-png-gif-file-formats--no-transaction-made-unsuccessful-failed-digital-business-pack-illustrations-6369553.png" alt="No Transactions">
        <p>No transactions found.</p>
    </div>

    <div id="qrPopup" class="qr-popup">
        <img id="qrImage" src="" alt="QR Code">
        <button onclick="downloadQR()"><i class="fa-solid fa-circle-down"></i></button>
        <button onclick="closeQRPopup()"><i class="fa-solid fa-circle-xmark"></i></button>
    </div>

    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <script>
        window.Telegram.WebApp.ready();
        const tg = Telegram.WebApp;
        tg.BackButton.isVisible = false;
        tg.requestFullscreen();
        const userId = tg.initDataUnsafe.user?.id;
        const userName = tg.initDataUnsafe.user?.first_name;
        tg.enableClosingConfirmation();
        tg.disableVerticalSwipes();
        tg.SettingsButton.isVisible = true;
        Telegram.WebApp.onEvent('settingsButtonClicked', function() {
          tg.HapticFeedback.impactOccurred("medium");
          window.location.href = 'https://api.bots.business/v2/bots/<%bot.id%>/web-app/apps?page=settings';
        });
        
        const haptic = function() {
          tg.HapticFeedback.impactOccurred("medium");
        }

        let qrCodeUrl = "";

        async function fetchTransactions() {
            const apiUrl = `https://api.bots.business/v2/bots/<%bot.id%>/web-app/account?user_id=${userId}&user_name=${userName}`;
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data.status === "success") {
                    document.getElementById('balance').textContent = `💎 ${data.balance} BBP`;
                    qrCodeUrl = data.qr_code; // Store the QR code URL from the API response
                    if (data.transactions.length > 0) {
                        renderTransactions(data.transactions);
                    } else {
                        document.getElementById('transactionList').innerHTML = '';
                        document.getElementById('noTransactions').style.display = 'flex';
                    }
                } else {
                    handleNoTransactions();
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
                handleNoTransactions();
            }
        }

        function renderTransactions(transactions) {
            const transactionList = document.getElementById('transactionList');
            transactionList.innerHTML = '';
            document.getElementById('noTransactions').style.display = 'none';

            transactions.forEach(transaction => {
                const transactionItem = document.createElement('div');
                transactionItem.classList.add('transaction-item');

                const isCredit = transaction.direction === 'credit';
                const amountClass = isCredit ? 'credit' : 'debit';
                const iconClass = isCredit ? 'credit-icon' : 'debit-icon';
                const amountSign = isCredit ? '+' : '-';

                transactionItem.innerHTML = `
                    <div class="transaction-icon ${iconClass}">
                        <i class="fas ${isCredit ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
                    </div>
                    <div class="transaction-details">
                        <span><strong>With:</strong> ${transaction.with}</span>
                        <div class="line"></div>
                        <span>${transaction.note || 'No Notes'}</span>
                    </div>
                    <div class="transaction-amount ${amountClass}">
                        ${amountSign} ${transaction.amount}
                    </div>
                `;

                transactionList.appendChild(transactionItem);
            });
        }

        function handleNoTransactions() {
            document.getElementById('transactionList').innerHTML = '';
            document.getElementById('noTransactions').style.display = 'flex';
            document.getElementById('noTransactions').querySelector('p').textContent = 'Failed to load transactions.';
        }

        function showQRPopup() {
            const qrPopup = document.getElementById('qrPopup');
            const qrImage = document.getElementById('qrImage');
            qrImage.src = qrCodeUrl; // Use the QR code URL from the API response
            qrPopup.style.display = 'block';
        }

        function closeQRPopup() {
            document.getElementById('qrPopup').style.display = 'none';
        }

        function downloadQR() {
            if (qrCodeUrl) {
                tg.downloadFile({
                    url: qrCodeUrl,
                    file_name: 'qr-code.png'
                }, (success) => {
                    if (success) {
                        tg.showAlert('QR code downloaded successfully!');
                    } else {
                        tg.showAlert('Failed to download QR code.');
                    }
                });
            }
        }

        window.onload = fetchTransactions;
    </script>
</body>
</html>
