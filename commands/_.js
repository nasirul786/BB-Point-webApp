/*CMD
  command: *
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!request) return;

// Parse request if it's a string
if (typeof request === 'string') {
  try {
    request = JSON.parse(request);
  } catch (e) {
    return; // Invalid JSON
  }
}

// Handle pre-checkout query
if (request.pre_checkout_query) {
  Api.answerPreCheckoutQuery({
    pre_checkout_query_id: request.pre_checkout_query.id,
    ok: true
  });
  return;
}

// Handle successful payment
if (request.successful_payment) {
  const invoiceData = request.successful_payment.invoice_payload;
  if (!invoiceData) return;

  const [userId, amountStr] = invoiceData.split(" ");
  const amount = parseFloat(amountStr);

  if (isNaN(amount) || !userId) return;

  // Credit BB Points to the recipient
  const userBBP = Libs.ResourcesLib.anotherUserRes("BBPoint", userId);
  userBBP.add(amount);

  // 🔹 Paid By Info
  const payerMention = `<a href="tg://user?id=${user.telegramid}">${user.first_name}</a>`;

  // ✅ Send Confirmation Message to the Recipient
  Api.sendMessage({
    chat_id: userId,
    text: `✅ Payment of ⭐️ <b>${request.successful_payment.total_amount}</b> is successful!\n\n🎉 <b>${amount} BBP</b> has been credited to your balance.\n\n💳 <b>Paid by:</b> ${payerMention}`,
    parse_mode: "HTML"
  });

  // 📝 **Save Transaction Logs for Recipient**
  let recipientTransactions = Bot.getProp(`transactions${userId}`) || [];
  recipientTransactions.push({
    amount,
    with: "purchase",
    paidBy: { id: user.telegramid, name: user.first_name },
    date: new Date().toLocaleDateString("en-GB"),
    type: "purchase",
    direction: "credit"
  });
  if (recipientTransactions.length > 5) recipientTransactions.shift();
  Bot.setProp(`transactions${userId}`, recipientTransactions, "json");

  // 🔔 **Webhook Notification (If Recipient Has One)**
  let recipientSettings = Bot.getProp(userId + "settings") || {};
  if (recipientSettings.webhook && /^https?:\/\/.+/i.test(recipientSettings.webhook)) {
    HTTP.post({
      url: recipientSettings.webhook,
      body: {
        status: "success",
        type: "purchase",
        amount: amount,
        userId: userId,
        paidBy: { id: user.telegramid, name: user.first_name },
        direction: "credit",
        date: new Date().toLocaleString("en-GB")
      }
    });
  }

  // 📢 **Transaction Announcement (If Enabled by Recipient)**
  var announceChannel = Bot.getProperty("transactionAnnouncement") || "@bbpTransactions";

  if (announceChannel && recipientSettings.transactionAnnounce) {
    var recipientMention = `<a href="tg://user?id=${userId}">${userId}</a>`;

    Api.sendMessage({
      chat_id: announceChannel,
      text: `📢 <b>Transaction Alert!</b>\n\n💰 <b>Amount:</b> ${amount} BBP\n👤 <b>Recipient:</b> ${recipientMention}\n💳 <b>Paid by:</b> ${payerMention}\n📝 <b>Type:</b> Purchase`,
      parse_mode: "HTML"
    });
  }
}

