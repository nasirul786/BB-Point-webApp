/*CMD
  command: /tip
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

const instructionMessage = "Please reply to another user's message with an amount to tip them BB Points.\n\n" +
  "*Example:* `/tip 65`";
const note = "tipping";

// Extract details from the replied message
const recipientId = request.reply_to_message?.from.id;
const recipientName = request.reply_to_message?.from.first_name;
const isRecipientBot = request.reply_to_message?.from.is_bot;
const isRecipientChat = request.reply_to_message?.sender_chat;

// Validate if a reply exists
if (!recipientId) {
  return Api.sendMessage({
    text: instructionMessage,
    parse_mode: "markdown",
    reply_to_message_id: request.message_id
  });
}

// Validate amount parameter
if (!params || isNaN(params) || parseFloat(params) <= 0) {
  return Api.sendMessage({
    text: "*Invalid input. Please use the format:*\n\n`/tip <amount>`",
    parse_mode: "markdown",
    reply_to_message_id: request.message_id
  });
}

const tipAmount = parseFloat(params);
const senderBalance = Libs.ResourcesLib.userRes("BBPoint");
const recipientBalance = Libs.ResourcesLib.anotherUserRes("BBPoint", recipientId);

// Check if the sender has enough BB Points
if (senderBalance.value() < tipAmount) {
  return Bot.sendMessage(`❌ You don't have enough BB Points.\n💰 Your current balance: *${senderBalance.value()} BBP*`, { parse_mode: "markdown", is_reply: true });
}

// Prevent tipping bots, groups, or channels
if (isRecipientBot) {
  return Bot.sendMessage("⚠️ *You can't transfer BB Points to a bot.*", { parse_mode: "markdown", is_reply: true});
}

if (isRecipientChat) {
  return Bot.sendMessage("⚠️ *You can't transfer BB Points to a channel or group.*", { parse_mode: "markdown", is_reply: true});
}

// Process the transaction
senderBalance.add(-tipAmount);
recipientBalance.add(tipAmount);

// define transactions for sender
let senderTransactions = Bot.getProp(`transactions${user.telegramid}`) || [];

//define current transaction for sender
let senderTransaction = {
  amount: tipAmount,
  with: recipientId,
  note: note,
  date: new Date().toLocaleDateString("en-GB"),
  type: "tip",
  direction: "debit"
};

// Push new transaction to senderTransactions
senderTransactions.push(senderTransaction);

// Limit to last 5 transactions
if (senderTransactions.length > 5) {
  senderTransactions.shift();
}

// Save sender transactions correctly
Bot.setProp(`transactions${user.telegramid}`, senderTransactions, "json");


// define transaction for recipient
let recipientTransactions = Bot.getProp(`transactions${recipientId}`) || [];

// define current transaction for recipient
let recipientTransaction = {
  amount: tipAmount,
  with: user.telegramid,
  note: note,
  date: new Date().toLocaleDateString("en-GB"),
  type: "tip",
  direction: "credit"
};

// Push new transaction to recipientTransactions
recipientTransactions.push(recipientTransaction);

// Limit to last 5 transactions
if (recipientTransactions.length > 5) {
  recipientTransactions.shift();
}

// Save recipient transactions correctly
Bot.setProp(`transactions${recipientId}`, recipientTransactions, "json");

// Send confirmation message
Api.sendMessage({
  text: `💰 <a href="tg://user?id=${user.telegramid}">${user.first_name}</a> tipped <b>${tipAmount} BBP</b> to <a href="tg://user?id=${recipientId}">${recipientName}</a>`,
  parse_mode: "html",
  reply_to_message_id: request.message_id
});
