/*CMD
  command: send
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

const { fromUser, pin, toUser: initialToUser, amount: initialAmount, note: initialNote, invoiceId } = options;
let toUser = initialToUser;
let amount = initialAmount;
let note = initialNote || "No note provided.";

// Prevent self-transactions
if (fromUser == toUser) {
  return WebApp.render({
    content: { status: "error", msg: "❌ You cannot send BBP to yourself." },
    mime_type: "application/json"
  });
}

// Handle invoice payment
if (invoiceId) {
  let invoice = Bot.getProp(invoiceId);
  if (!invoice) {
    return WebApp.render({
      content: { status: "error", msg: "Invalid invoiceId." },
      mime_type: "application/json"
    });
  }

  if (invoice.status === "paid") {
    return WebApp.render({
      content: { status: "error", msg: "❌ This invoice has already been paid." },
      mime_type: "application/json"
    });
  }

  amount = invoice.amount;
  note = invoice.description;
  toUser = invoice.userId;
}

// Check required parameters
if (!fromUser || !pin) {
  return WebApp.render({
    content: { status: "error", msg: "Missing required parameters: fromUser and pin are required." },
    mime_type: "application/json"
  });
}

if (toUser && !amount) {
  return WebApp.render({
    content: { status: "error", msg: "Missing required parameter: amount is required when toUser is provided." },
    mime_type: "application/json"
  });
}

// Validate sender's PIN
const userPin = Bot.getProperty(`pin${fromUser}`);
if (!userPin) {
  return WebApp.render({
    content: { status: "error", msg: "❌ Your pin is not set. Use /setPin <6 digit pin> to set your pin." },
    mime_type: "application/json"
  });
}
if (pin !== userPin) {
  return WebApp.render({
    content: { status: "error", msg: "❌ Incorrect pin. Retrieve it with /myPin command." },
    mime_type: "application/json"
  });
}

// Fetch balances
const fromUserBBP = Libs.ResourcesLib.anotherUserRes("BBPoint", fromUser);
const toUserBBP = Libs.ResourcesLib.anotherUserRes("BBPoint", toUser);

if (fromUserBBP.value() < parseFloat(amount)) {
  return WebApp.render({
    content: { status: "error", msg: `❌ Insufficient BBP. Your current balance is ${fromUserBBP.value()} 💎.` },
    mime_type: "application/json"
  });
}

// Perform the transaction
fromUserBBP.remove(parseFloat(amount));
toUserBBP.add(parseFloat(amount));

// Update invoice status if applicable
if (invoiceId) {
  let invoice = Bot.getProp(invoiceId);
  invoice.status = "paid";
  invoice.paidBy = fromUser;
  Bot.setProp(invoiceId, invoice, "json");
}

// Success response
WebApp.render({
  content: {
    status: "success",
    msg: `✅ Transaction completed successfully! Sent ${amount} BBP to user ID: ${toUser}.`
  },
  mime_type: "application/json"
});

// Notify users via Telegram
const action = new Proxy({}, {
  get(_, method) {
    return (params) => {
      HTTP.post({
        url: `https://api.telegram.org/bot${bot.token}/${method}`,
        body: JSON.stringify(params),
        headers: { "Content-Type": "application/json" }
      });
    };
  }
});

// Notify sender
action.sendMessage({
  chat_id: fromUser,
  text: `✅ Successfully sent ${amount} BBP to user ID: ${toUser}. New balance: ${fromUserBBP.value()} 💎.`
});

// Notify recipient
action.sendMessage({
  chat_id: toUser,
  text: `🎉 You received ${amount} BBP from user ID: ${fromUser}. New balance: ${toUserBBP.value()} 💎.\n\nNote:\n${note}`
});

// Save transaction logs for sender
let senderTransactions = Bot.getProp(`transactions${fromUser}`) || [];
senderTransactions.push({
  amount,
  with: toUser,
  note,
  date: new Date().toLocaleDateString("en-GB"),
  type: "online pay",
  direction: "debit"
});
if (senderTransactions.length > 5) senderTransactions.shift();
Bot.setProp(`transactions${fromUser}`, senderTransactions, "json");

// Save transaction logs for recipient
let recipientTransactions = Bot.getProp(`transactions${toUser}`) || [];
recipientTransactions.push({
  amount,
  with: fromUser,
  note,
  date: new Date().toLocaleDateString("en-GB"),
  type: "online pay",
  direction: "credit"
});
if (recipientTransactions.length > 5) recipientTransactions.shift();
Bot.setProp(`transactions${toUser}`, recipientTransactions, "json");

// ✅ **NEW: ANNOUNCE TRANSACTION TO A TELEGRAM CHANNEL IF ENABLED**
var senderSettings = Bot.getProp(fromUser + "settings") || {};
var recipientSettings = Bot.getProp(toUser + "settings") || {};
var announceChannel = Bot.getProperty("transactionAnnouncement") || "@bbpTransactions";

if (announceChannel && senderSettings.transactionAnnounce && recipientSettings.transactionAnnounce) {
  var senderMention = `<a href="tg://user?id=${fromUser}">${fromUser}</a>`;
  var recipientMention = `<a href="tg://user?id=${toUser}">${toUser}</a>`;

  action.sendMessage({
    chat_id: announceChannel,
    text: `📢 <b>Transaction Alert!</b>\n\n` +
          `💰 <b>Amount:</b> ${amount} BBP\n` +
          `👤 <b>Sender:</b> ${senderMention}\n` +
          `👤 <b>Recipient:</b> ${recipientMention}\n` +
          `📝 <b>Note:</b> ${note}`,
    parse_mode: "HTML"
  });
}

// ✅ **NEW: SEND TRANSACTION DETAILS TO USER WEBHOOKS IF ENABLED**
const sendWebhook = (webhookUrl, data) => {
  if (/^https?:\/\/.+/i.test(webhookUrl)) {
    HTTP.post({
      url: webhookUrl,
      body: data,
      headers: { "Content-Type": "application/json" }
    });
  }
};

// Send webhook to sender (if set)
if (senderSettings.webhook) {
  sendWebhook(senderSettings.webhook, {
    user: fromUser,
    amount: amount,
    transaction_type: "online pay",
    direction: "debit",
    note: note,
    date: new Date().toISOString()
  });
}

// Send webhook to recipient (if set)
if (recipientSettings.webhook) {
  sendWebhook(recipientSettings.webhook, {
    user: toUser,
    amount: amount,
    transaction_type: "online pay",
    direction: "credit",
    note: note,
    date: new Date().toISOString()
  });
}

