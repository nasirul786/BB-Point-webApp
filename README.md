# bbp_app_bot - chat bot
It is repository for chat bot: [@bbp_app_bot](https://t.me/bbp_app_bot)

# Introduction

## BB Point WebApp Bot  

**BB Point WebApp Bot** is a powerful **Telegram WebApp bot** designed to provide a **seamless, secure, and feature-rich** payment experience. It offers **API support** and multiple advanced functionalities, making it an essential tool for transactions within the Telegram ecosystem.  

With an intuitive **user interface, QR code scanning, haptic feedback, and easy navigation**, users can perform various financial actions effortlessly. Every transaction is **secured with PIN verification**, ensuring **maximum security**, even though the bot is **open-source**.  

BB Point WebApp Bot is also integrated with **Telegram Stars**, allowing users to **buy BB Points using stars** and track their last 5 transactions. Since **large-scale data storage is not maintained** (to prevent whole-user issues), we provide **webhook support** to notify users in real time about their transactions.  

## 🔥 Key Features  

- **[Homepage](#-modern--stylish-homepage)** - Homepae of the App with all options.
- **[QR Code Payment](#scan-qr-code-to-pay)** – Scan a QR code to pay instantly.  
- **[Pay Any User](api/send-payment.md)** – Send BB Points to any user via their Telegram ID.  
- **[Request Payment](api/request.md)** – Easily request payments from users.  
- **[Create Invoice](api/create-invoice.md)** – Generate invoices for payments.  
- **[Invoice Status](api/invoice-status.md)** – Check the status of any invoice.  
- **[Pay Invoice](api/send-payment.md)** – Pay invoices using QR code or payment link.  
- **[Create Gift](api/create-gift.md)** – Distribute BB Points among multiple users with an optional password.  
- **[Claim Gift](api/claim-gift.md)** – Users can redeem gifts securely.  
- **[Block/Accept Payment Requests](api/get-settings.md)** – Control whether you accept incoming payment requests.  
- **[Transaction Announcements](api/get-settings.md)** – Enable announcements for successful transactions.  
- **[Set Webhook URL](api/update-settings.md)** – Configure a webhook to receive real-time transaction updates.  
- **[Webhook Notifications](api/webhook-types.md)** – Get instant notifications for every transaction.  
- **[PIN Verification](api/update-settings.md)** – Secure each transaction with a **PIN**.  
- **[Buy BB Points with Telegram Stars](api/BBP-purchase.md)** – Exchange **Stars** for **BB Points**.  
- **[Get Last 5 Transactions](api/account.md)** – Retrieve the latest transaction history.  
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

## 📌 **Transaction History**  

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
2. Select **"Settings"** to manage preferences like **PIN security, webhook setup, and transaction announcements**.  

---

## 📌 **Additional Features**  

- **App Header** – The header displays **"BBP App"**, below the **current BBP balance**.  
- **Closing Confirmation** – When exiting, a confirmation prompt ensures accidental closures are avoided.
- **disabled virticle sweep** - To make the experience better.
- **Full-Screen View** – The bot runs in **full-screen mode**, fully optimized for **Telegram’s WebApp ecosystem**.  

BB Point WebApp Bot's homepage ensures a **smooth, intuitive, and efficient experience**, making it **easy to manage BB Point transactions with a few taps!** 🚀  


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

- The payment process **uses the [Send Payment API](https://github.com/nasirul786/BB-Point-API/blob/main/api/send-payment.md)**, meaning:  
  - **Fake invoices** or incorrect payments **are automatically detected**.  
  - If **an error occurs**, the bot **displays a Telegram-style popup** with detailed information and provides **haptic feedback**.  

The **QR code scanner** is a **built-in Telegram WebApp feature** and can be invoked using:  

```js
Windows.Telegram.WebApp.showScanQrPopup(params[, callback]);
```

## Why Use BB Point WebApp Bot?  
- ✅ **Fast, secure, and API-ready**  
- ✅ **Intuitive interface & navigation**  
- ✅ **Highly secure PIN-based transactions**  
- ✅ **Open-source yet highly protected**  
- ✅ **Real-time webhook notifications**  
- ✅ **Seamless Telegram integration**  

Ready to explore? Get started with the **[API Documentation](SUMMARY.md)**. 🚀
