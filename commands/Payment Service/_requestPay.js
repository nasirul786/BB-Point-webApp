/*CMD
  command: /requestPay
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Payment Service

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!params || params.length < 1) {
  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Invalid command format.",
    show_alert: true
  });
}

if (params.toUpperCase() === "NO") {
  // Just delete the message if params is "NO"
  Api.deleteMessage({ chat_id: request.message.chat.id, message_id: request.message.message_id });
  return;
}

var requestId = params;
var requestData = Bot.getProperty(`paymentRequest_${requestId}`);

if (!requestData) {
  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Invalid or expired request ID.",
    show_alert: true
  });
}

var recipientId = requestData.requesterId;
var amount = parseFloat(requestData.amount);
var note = requestData.note;
var status = requestData.status;

// Prevent duplicate transactions if already paid
if (status === "paid") {
  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ This request has already been paid.",
    show_alert: true
  });
}

// Check balance from current user
var currentUserBBP = Libs.ResourcesLib.userRes("BBPoint");
if (currentUserBBP.value() < amount) {
  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Insufficient BBP balance.",
    show_alert: true
  });
}

// Process payment
currentUserBBP.remove(amount);
var requesterBBP = Libs.ResourcesLib.anotherUserRes("BBPoint", recipientId);
requesterBBP.add(amount);

// Update request status to "paid"
Bot.setProperty(`paymentRequest_${requestId}`, { ...requestData, status: "paid" }, "json");

// Save transaction for payer
let payerTransactions = Bot.getProp(`transactions${user.telegramid}`) || [];
payerTransactions.push({
  amount,
  with: recipientId,
  note,
  date: new Date().toLocaleDateString("en-GB"),
  type: "request payment",
  direction: "debit"
});
if (payerTransactions.length > 5) payerTransactions.shift();
Bot.setProp(`transactions${user.telegramid}`, payerTransactions, "json");

// Save transaction for recipient
let recipientTransactions = Bot.getProp(`transactions${recipientId}`) || [];
recipientTransactions.push({
  amount,
  with: user.telegramid,
  note,
  date: new Date().toLocaleDateString("en-GB"),
  type: "request payment",
  direction: "credit"
});
if (recipientTransactions.length > 5) recipientTransactions.shift();
Bot.setProp(`transactions${recipientId}`, recipientTransactions, "json");

// Notify recipient
Api.sendMessage({
  chat_id: recipientId,
  text: `✅ Your payment request of <b>${amount} BBP</b> from <a href='tg://user?id=${user.telegramid}'>${user.first_name}</a> has been <b>approved</b> and credited to your account.`,
  parse_mode: "html"
});

// Confirm transaction to payer
Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: `✅ Payment of ${amount} BBP sent successfully!`,
  show_alert: false
});

// Delete the message after successful payment
Api.deleteMessage({ chat_id: request.message.chat.id, message_id: request.message.message_id });

// Announcement settings
var payerSettings = Bot.getProp(`${user.telegramid}settings`) || {};
var recipientSettings = Bot.getProp(`${recipientId}settings`) || {};
var announceChannel = Bot.getProperty("transactionAnnouncement") || "@bbpTransactions";

// Announce transaction if both users enabled transaction announcements
if (announceChannel && payerSettings.transactionAnnounce && recipientSettings.transactionAnnounce) {
  var payerMention = `<a href="tg://user?id=${user.telegramid}">${user.first_name}</a>`;
  var recipientMention = `<a href="tg://user?id=${recipientId}">${recipientId}</a>`;

  Api.sendMessage({
    chat_id: announceChannel,
    text: `📢 <b>Payment Request Approved!</b>\n\n` +
          `💰 <b>Amount:</b> ${amount} BBP\n` +
          `👤 <b>From:</b> ${payerMention}\n` +
          `👤 <b>To:</b> ${recipientMention}\n` +
          `📝 <b>Note:</b> ${note}`,
    parse_mode: "HTML"
  });
}

// Webhook Notification for both payer and recipient
var payerWebhook = payerSettings.webhook;
var recipientWebhook = recipientSettings.webhook;
var webhookData = {
  amount: amount,
  type: "request payment",
  direction: "debit",
  date: new Date().toISOString(),
  description: note,
  fromUser: user.telegramid,
  toUser: recipientId
};

// Send webhook for payer
if (payerWebhook && /^https?:\/\/.+/i.test(payerWebhook)) {
  HTTP.post({
    url: payerWebhook,
    body: webhookData
  });
}

// Send webhook for recipient
if (recipientWebhook && /^https?:\/\/.+/i.test(recipientWebhook)) {
  webhookData.direction = "credit";
  HTTP.post({
    url: recipientWebhook,
    body: webhookData
  });
}

