# bbp_app_bot - chat bot
It is repository for chat bot: [@bbp_app_bot](https://t.me/bbp_app_bot)

## BB Point WebApp Bot  

**BB Point WebApp Bot** is a powerful **Telegram WebApp bot** designed to provide a **seamless, secure, and feature-rich** BBP payment experience. It offers **API support** and multiple advanced functionalities, making it an essential tool for transactions within the Telegram ecosystem.  

With an intuitive **user interface, QR code scanning, haptic feedback, and easy navigation**, users can perform various financial actions effortlessly. Every transaction is **secured with PIN verification**, ensuring **maximum security**, even though the bot is **open-source**.  

BB Point WebApp Bot is also integrated with **Telegram Stars**, allowing users to **buy BB Points using stars** and track their last 5 transactions. Since **large-scale data storage is not maintained** (to prevent whole-user issues), we provide **webhook support** to notify users in real time about their transactions.  

## 🔥 Key Features  

- **[Homepage](#-modern--stylish-homepage)** - Homepae of the App with all options.
- **[QR Code Payment](#scan-qr-code-to-pay)** – Scan a QR code to pay instantly.  
- **[Pay Any User](api/send-payment.md)** – Send BB Points to any user via their Telegram ID.  
- **[Request Payment](api/request.md)** – Easily request payments from users.  
- **[Create & manage Invoice](https://captain-1.gitbook.io/bb-point-api/api-documentation/create-invoice)** – Generate invoices for accepting payments.
- **[Create Gift](api/create-gift.md)** – Distribute BB Points among multiple users with an optional password.  
- **[Claim Gift](api/claim-gift.md)** – Users can redeem gifts securely.  
- **[Settings](api/get-settings.md)** – Manage payments toggle accept requests setting , set a webhook for real-time alerts, and toggle transaction announcements! 🚀 
- **[PIN Verification](api/update-settings.md)** – Secure each transaction with a **PIN**.  
- **[Buy BB Points with Telegram Stars](api/BBP-purchase.md)** – Exchange **Stars** for **BB Points**.
- **[Easy Navigation & Haptic Feedback](README.md)** – Smooth user experience with **Telegram’s back function & device navigation support**.


# Homepage – BB Point WebApp Bot  
The **BB Point WebApp Bot** homepage provides a **clean, modern, and intuitive interface** for seamless transactions. It is designed to make navigation easy, with all **core functions accessible via icons** at the top and a **transaction history** section below.  

**🖼️ Screenshot of Homepage**  
![Homepage Screenshot](https://github.com/nasirul786/BB-Point-API/blob/main/img/home-bbp.jpg)  

---

🔹 **Available Buttons & Features** 
Buttons are design with svg icons.

The homepage consists of **six primary buttons**, allowing users to **perform transactions effortlessly**:  

| Button  | Function |
|---------|----------|
| **Send** | Transfer BB Points to any user by entering their Telegram ID. |
| **Request** | Request a payment from another user. |
| **My QR** | View and download your **payment QR code** for receiving BB Points. |
| **Scan QR** | Scan another user's **payment QR code** to send a payment instantly. |
| **Buy BBP** | Purchase **BB Points using Telegram Stars**. |
| **Gifts** | Create or claim BB Point gifts. |

---

📌 **Transaction History**  

Below the action buttons, the homepage displays the **last 5 transactions**. Each transaction entry includes:  

- **Credit/Debit Status** – Whether the amount was **credited or debited**.  
- **Transaction Type** – Payment, request, gift, invoice, etc.  
- **Sender/Receiver Details** – Who the payment was received from or transferred to.  
- **Transaction Note** – A short description or note about the transaction.  
- **Transaction Amount** – The exact BB Points transferred or received.  

> ⚠️ *BB Point WebApp Bot does not store large transaction data due to system limitations. Users can set up a webhook to receive full transaction logs in real-time.*  

---

⚙️ **Navigating to Settings**  

To access the **Settings page**:  

1. Click on the **three-dot menu (⋮)** in the top-right corner.  
2. Select **"Settings"** to manage preferences like **Acept Request, webhook setup, and transaction announcements**.


# Scan QR Code to Pay  
The **BB Point WebApp Bot** allows users to **scan QR codes** for **quick and seamless payments**. The QR code scanner is fully integrated with **Telegram's native scanning feature**, ensuring fast and secure transactions.  

#### 🖼️ Screenshot of Scan QR Page  
![Scan QR Code Screenshot](https://github.com/nasirul786/BB-Point-API/blob/main/img/qr-scan.jpg)  

---

**🚀 How to Use the QR Code Scanner**  

1. Click the **QR scanner icon** on the **homepage**.  
2. The **QR code scanner opens automatically**.  
3. **Scan the recipient’s QR code** (user or invoice).  
4. The app **detects the QR type** and processes accordingly:  
   - **Invoice QR** → Directly opens the **PIN input popup** for confirmation.  
   - **User Payment QR** → Opens the **send payment page** with the recipient’s details.  
5. **Enter your PIN** to confirm and complete the transaction.  

---

🔍 **QR Code Detection & Processing**  

The scanner **automatically detects** the type of QR code being scanned:
the QR title (receiver name) shows above the fileds, each fields hase representive icons from font awesome library.

| QR Type | Action |
|---------|--------|
| **Invoice QR** | Opens the **PIN input popup** instantly for payment confirmation. |
| **User Payment QR** | Pre-fills the payment page with recipient details for manual confirmation. |

- The payment process **uses the [Send Payment API](https://captain-1.gitbook.io/bb-point-api/api-documentation/send-payment)**, meaning:  
  - **Fake invoices** or incorrect payments **are automatically detected**.  
  - If **an error occurs**, the bot **displays a Telegram-style popup** with detailed information and provides **haptic feedback**.  

The **QR code scanner** is a **built-in Telegram WebApp feature** and can be invoked using:  

```js
Windows.Telegram.WebApp.showScanQrPopup(params[, callback]);
```



# Pay to Any User  
The **Pay to Any User** feature allows users to **send BB Points** directly to any Telegram user by entering their **User ID**, amount, and an optional note. The **payment process is highly secure**, utilizing the same **public APIs** with **PIN verification** for protection.  

---

🖼️ Screenshot of Pay to User Page  
![Pay to User Screenshot](https://github.com/nasirul786/BB-Point-API/blob/main/img/send-payment.jpg)  

---

🚀 **How to Send Payment to a User**  

1. **Open the Payment Page**
   - Click **Send** button. 
   - Unlike the **QR payment** page, the scanner does **not open automatically** (`scan=false` is used as an identifier).  

2. **Enter Payment Details**  
   - **User ID** – Enter the recipient's Telegram ID.  
   - **Amount** – Enter the amount of BB Points to send.  
   - **Note (Optional)** – Add a short description for the payment.  

3. **Confirm Payment**  
   - Click the **"Send Payment"** button.  
   - The **PIN input popup** appears for verification.  
   - Enter your **PIN** and confirm to proceed.  

4. **Transaction Processing & Confirmation**  
   - If successful, the bot displays the **payment details**.  
   - If the **PIN is incorrect** or **balance is insufficient**, the bot:  
     - **Vibrates** (haptic feedback).  
     - Shows a **Telegram-style error popup** explaining the issue.  

---

🔔 **Payment Notifications & Webhooks**  

- **Transaction Announcements**  
  - If **both sender and receiver** have enabled **transaction announcements** in settings, the transaction details will be send to our public telegram channel: **[@bbpTransactions](https://t.me/bbpTransactions)**.  

- **Webhook Notifications**  
  - If a **webhook is set**, a **real-time transaction notification** is sent.  
  - If **no webhook is set**, the process **ignores the webhook step** without errors.
  - See all webhook types [Here](https://captain-1.gitbook.io/bb-point-api/api-documentation/webhook-types)
 

# Request Payment  
The **Request Payment** feature allows users to **send a payment request** to any Telegram user by entering their **User ID**, amount, and an optional note. The process is similar to **Send Payment**, but instead of sending BB Points, it **requests** them.  

**Requesting Screenshot**

![request](https://github.com/nasirul786/BB-Point-API/blob/main/img/success-request.jpg)

**Requst Failed ScreenShot**

![faild request](https://github.com/nasirul786/BB-Point-API/blob/main/img/request-failed.jpg)

---

🚀 **How to Request a Payment**
Click **Request** button on the home screen to go to request section. 

1. Enter **User ID**, **Amount** and optional **Note**.
2. Click **Request Payment** and enter pin to confirm.  
3. **Success Confirmation**  
   - If successful, a **popup** appears with the **request ID** and details.  
   - The recipient gets notified of the request with all the details along with button to accept or reject the requst.
 > Webhook notification will e sent once the request is beeing accepted.


# Create Gift  
The **Create Gift** feature allows users to distribute BB Points among multiple recipients securely. Users can set a **title, description, and a password** (optional) for extra protection.  

---

🖼️ Screenshot of Create Gift Page  
![Create Gift Screenshot](https://github.com/nasirul786/BB-Point-API/blob/main/img/create-gift.jpg) 

---

🚀 **How to Create a Gift**  

1. **Open the Gift Section**  
   - Click the **"Gifts"** button on the homepage.  
   - Select **"Create Gift"** to proceed.  

2. **Enter Gift Details**  

| Field          | Required | Description |
|---------------|----------|-------------|
| **Amount**    | ✅ Yes  | Total BB Points to distribute. |
| **Title**     | ✅ Yes  | Gift name (e.g., "Birthday Gift"). |
| **Description** | ✅ Yes  | Short note about the gift. |
| **Total Users** | ✅ Yes  | Number of users who can claim (must be less than the amount). |
| **Password**  | ❌ No   | Optional password to restrict claims. |

3. **Add Password Protection (Optional)**  
   - Click **"Add Password"** to enable the password field.  
   - A **password-protected gift cannot be claimed without the exact password**.  

4. **Confirm & Send**  
   - Click **"Create Gift"** and enter your **PIN** for verification.  
   - The system **automatically calculates** the **prize per user** based on the total amount and user count.  

---

**Gift Details on DM**
![gift on dm](https://github.com/nasirul786/BB-Point-API/blob/main/img/gift-dm.jpg)

🎁 **Gift Creation Confirmation**  

| Field          | Description |
|---------------|-------------|
| **Gift Code** | A unique code for claiming the gift. |
| **Title**     | The gift name. |
| **Description** | The custom message attached. |
| **Total Users** | Number of recipients. |
| **Prize Per User** | Amount each user will receive. |
| **Password** | If set, it must be entered to claim. |

> 🎉 *A popup appears with the gift details, and the user receives a direct message with the gift code. and option to sharewith the other user*  

---

🔔 **Additional Notes**  

- **Gift code is required** for claiming gifts.  
- **Password-protected gifts require the exact password**.  
- If **PIN verification fails**, the bot will **vibrate and show a Telegram-style popup** with the issue.



# Claim Gift  
Claiming a gift in **BB Point WebApp Bot** is a **simple and seamless process**. No **PIN verification** is required for claiming, but **you must have a PIN set** in the bot. This security measure ensures that only **real users** can claim gifts, preventing unauthorized access and abuse.  

---

**🖼️ Claim Gift Page**

![Claim Gift Screenshot](https://github.com/nasirul786/BB-Point-API/blob/main/img/claim-gift.jpg)  

---

**🚀 How to Claim a Gift** 

1. Open the **BB Point WebApp Bot** and tap the **"Gifts"** icon on the homepage.  
2. Enter the **Gift Code** provided by the sender.  
3. If the gift is **password-protected**, enter the **correct password**.  
4. Tap **"Claim Gift"** to receive the BB Points instantly.  

No additional steps or manual verification are required. If the details are correct, the gift will be credited to your account immediately. and the page will show the details of the gift and remaining claims. also yhe transaction will record to the history (last 5 transaction), and send channel announcement if enabled, send webhook notification if set.  

---

**🔐 Security & User Verification**

To maintain security and prevent fraudulent claims, every user **must have a PIN set** in the bot. This does not mean you need to enter a PIN when claiming, but having a PIN **proves you are a verified user**.  

> This system **blocks fake users** from using the **Claim Gift API** to repeatedly claim the same gift with different user IDs. If a user has set up a PIN, they are recognized as a **real account**, ensuring a fair and safe environment for gift distribution.



# Settings  
The **Settings** page in **BB Point WebApp Bot** allows users to manage various preferences for a more customized experience. Users can **enable or disable payment requests, transaction announcements, and set up a webhook for real-time transaction alerts.**  

**Settings Page ScreenShot**

![setting page](https://github.com/nasirul786/BB-Point-API/blob/main/img/settings.jpg)

---

🔹 **Block or Allow Payment Requests**  
If you don’t want users to send you **payment requests**, you can **disable** this feature. Once disabled, no one will be able to **request payments** from you. You can **re-enable it anytime** if needed.  

🔹 **Enable or Disable Payment Announcements**  
By enabling **payment announcements**, your transactions will be posted on our **Telegram channel**: [BBP Transactions](https://t.me/bbpTransactions).
- **Both parties** (sender and receiver) **must enable** this setting for the transaction to be announced.  
- If only a **single party** is involved (e.g., creating or claiming a gift), only **their** announcement setting matters.

🔹 **Add App icon to the HomeScreen**
Click the **Add TO HomeScreen** button to add thhe app icon to the home screen, like an regular mobile apps, it will be available on the users phone home screen allowing them to open the app direcly without opening telegram. the button design is and color is matches with users telegram theme. (we have theme params function on webApp to detect the theme button color). 

🔹 **Set Webhook URL for Real-Time Alerts**  
Since the bot **does not store complete transaction history** due to limitations, users can set up a **webhook** to receive transaction details **instantly**.  

- The bot sends **POST data** to the webhook URL you set.  
- This allows users to **store transaction history** on their own servers.  
- Refer to the **[Webhook Types](https://captain-1.gitbook.io/bb-point-api/api-documentation/webhook-types)** page to see all available webhook notifications.
> With these settings, users have **full control** over how their transactions are managed, announced, and stored. 🚀  



## Why Use BB Point WebApp Bot?  
- ✅ **Fast, secure, and API-ready**  
- ✅ **Intuitive interface & navigation**  
- ✅ **Highly secure PIN-based transactions**  
- ✅ **Open-source yet highly protected**  
- ✅ **Real-time webhook notifications**  
- ✅ **Seamless Telegram integration**  

Ready to explore? Get started with the **[API Documentation](SUMMARY.md)**. 🚀
