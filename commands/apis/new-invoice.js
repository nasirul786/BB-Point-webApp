/*CMD
  command: new-invoice
  help: 
  need_reply: false
  auto_retry_time: 
  folder: apis

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Destructure parameters from options
const { amount, userId, pin, description, title, payload } = options;

// Collect missing parameters
const missingParams = [];
if (!amount) missingParams.push("amount");
if (!userId) missingParams.push("userId");
if (!pin) missingParams.push("pin");
if (!description) missingParams.push("description");
if (!title) missingParams.push("title");
if (!payload) missingParams.push("payload");

// If any parameters are missing, render error
if (missingParams.length > 0) {
  return WebApp.render({
    content: {
      status: "error",
      msg: `Missing parameters: ${missingParams.join(", ")}`
    },
    mime_type: "application/json"
  });
}

// Validate sender's PIN
const userPin = Bot.getProperty(`pin${userId}`);
if (!userPin) {
  return WebApp.render({
    content: {
      status: "error",
      msg: "❌ Your pin is not set. Please set your pin using /setPin <6 digit pin>."
    },
    mime_type: "application/json"
  });
}

if (pin !== userPin) {
  return WebApp.render({
    content: {
      status: "error",
      msg: "❌ Incorrect pin. Use /myPin to retrieve it."
    },
    mime_type: "application/json"
  });
}

// Generate a random 8-character invoice ID
const generateInvoiceId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `invoice-${id}`;
};

const invoiceId = generateInvoiceId();

// Prepare QR code data
const qrData = encodeURIComponent(JSON.stringify({ invoiceId, title, amount }));
const qrCodeUrl = `https://quickchart.io/qr?text=${qrData}`;

// Create invoice object
const invoice = {
  qrCode: qrCodeUrl,
  invoiceId: invoiceId,
  title: title,
  amount: amount,
  userId: userId,
  payLink: "https://t.me/"+bot.name+"?start="+invoiceId,
  description: description,
  status: "unpaid",
  paidBy: null
};

// Save invoice data
Bot.setProp(invoiceId, invoice, "json");

// Render invoice response
WebApp.render({
  content: {
    status: "success",
    invoice: invoice
  },
  mime_type: "application/json"
});

