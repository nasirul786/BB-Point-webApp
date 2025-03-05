/*CMD
  command: /payInvoice
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

var invoiceId = params; // Get invoice ID from params
var invoice = Bot.getProp(invoiceId);

if (!invoice) {
  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Invalid or expired invoice ID.",
    show_alert: true
  });
}

// Check if invoice is already paid
if (invoice.status === "paid") {
  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ This invoice has already been paid.",
    show_alert: true
  });
}

var recipientId = invoice.userId; // Invoice creator (recipient)
var amount = parseFloat(invoice.amount);
var description = invoice.description || "Invoice payment";

// Ensure payer has enough balance
var payerBBP = Libs.ResourcesLib.userRes("BBPoint");
if (payerBBP.value() < amount) {
  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Insufficient BBP balance.",
    show_alert: true
  });
}

// Deduct from payer, add to recipient
payerBBP.remove(amount);
var recipientBBP = Libs.ResourcesLib.anotherUserRes("BBPoint", recipientId);
recipientBBP.add(amount);

// Mark invoice as paid
invoice.status = "paid";
invoice.paidBy = user.telegramid;
Bot.setProp(invoiceId, invoice, "json");

// Notify recipient (Invoice creator)
Api.sendMessage({
  chat_id: recipientId,
  text: `✅ Your invoice of <b>${amount} BBP</b> has been paid by <a href='tg://user?id=${user.telegramid}'>${user.first_name}</a>.`,
  parse_mode: "html"
});

// Notify payer (who paid the invoice)
Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: `✅ Invoice paid successfully!`,
  show_alert: false
});

// Save transaction history for payer
let payerTransactions = Bot.getProp(`transactions${user.telegramid}`) || [];
payerTransactions.push({
  amount: amount,
  with: recipientId,
  note: description,
  date: new Date().toLocaleDateString("en-GB"),
  type: "invoice payment",
  direction: "debit"
});
if (payerTransactions.length > 5) payerTransactions.shift();
Bot.setProp(`transactions${user.telegramid}`, payerTransactions, "json");

// Save transaction history for recipient
let recipientTransactions = Bot.getProp(`transactions${recipientId}`) || [];
recipientTransactions.push({
  amount: amount,
  with: user.telegramid,
  note: description,
  date: new Date().toLocaleDateString("en-GB"),
  type: "invoice payment",
  direction: "credit"
});
if (recipientTransactions.length > 5) recipientTransactions.shift();
Bot.setProp(`transactions${recipientId}`, recipientTransactions, "json");

// Get settings for announcement & webhook
var payerSettings = Bot.getProp(user.telegramid + "settings") || {};
var recipientSettings = Bot.getProp(recipientId + "settings") || {};
var announceChannel = Bot.getProperty("transactionAnnouncement") || "@bbpTransactions";

// Send webhook notification for both parties if enabled
if (payerSettings.webhook && /^https?:\/\/.+/i.test(payerSettings.webhook)) {
  HTTP.post({
    url: payerSettings.webhook,
    body: {
      userId: user.telegramid,
      amount: amount,
      type: "invoice payment",
      direction: "debit",
      date: new Date().toISOString(),
      description: description,
      invoiceId: invoiceId
    }
  });
}

if (recipientSettings.webhook && /^https?:\/\/.+/i.test(recipientSettings.webhook)) {
  HTTP.post({
    url: recipientSettings.webhook,
    body: {
      userId: recipientId,
      amount: amount,
      type: "invoice payment",
      direction: "credit",
      date: new Date().toISOString(),
      description: description,
      invoiceId: invoiceId
    }
  });
}

// Announce transaction if BOTH parties have enabled transaction announcements
if (announceChannel && payerSettings.transactionAnnounce && recipientSettings.transactionAnnounce) {
  var payerMention = `<a href="tg://user?id=${user.telegramid}">${user.first_name}</a>`;
  var recipientMention = `<a href="tg://user?id=${recipientId}">${recipientId}</a>`;

  Api.sendMessage({
    chat_id: announceChannel,
    text: `📢 <b>Invoice Payment Alert!</b>\n\n` +
          `💰 <b>Amount:</b> ${amount} BBP\n` +
          `👤 <b>Payer:</b> ${payerMention}\n` +
          `👤 <b>Recipient:</b> ${recipientMention}\n` +
          `📝 <b>Description:</b> ${description}\n` +
          `🧾 <b>Invoice ID:</b> ${invoiceId}`,
    parse_mode: "HTML"
  });
}

