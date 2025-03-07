/*CMD
  command: create-gift
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

const userId = options.userId;
const providedPin = options.pin;
var amount = parseInt(options.amount);
var description = options.note || "Claim this gift";
var title = options.title || "Gift";
var totalUser = parseInt(options.totalUser) || 1;
var password = options.password || null;

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

// Validate required fields
var missingParams = [];
if (!userId) missingParams.push("userId");
if (!providedPin) missingParams.push("pin");
if (!amount) missingParams.push("amount");

if (missingParams.length > 0) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: `❌ Missing required parameters: ${missingParams.join(", ")}`
    }
  });
}

// Validate numeric values and amount must be an integer
if (isNaN(userId) || isNaN(amount) || !Number.isInteger(amount) || amount < 1) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ Invalid userId or amount. Amount must be a whole number greater than 0."
    }
  });
}

// Validate totalUser count
if (isNaN(totalUser) || !Number.isInteger(totalUser) || totalUser < 1 || totalUser > amount) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ Invalid totalUser value. It must be a whole number and less than the prize amount."
    }
  });
}

// Validate sender's PIN
const userPin = Bot.getProperty(`pin${userId}`);
if (!userPin) {
  return WebApp.render({
    content: { status: "error", msg: "❌ Your pin is not set. Use /setPin <6 digit pin> to set your pin." },
    mime_type: "application/json"
  });
}
if (providedPin !== userPin) {
  return WebApp.render({
    content: { status: "error", msg: "❌ Incorrect pin. Retrieve it with /myPin command." },
    mime_type: "application/json"
  });
}

// Check BBPoint balance of the specified user
var targetUserBBP = Libs.ResourcesLib.anotherUserRes("BBPoint", userId);
if (targetUserBBP.value() < amount) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ You do not have enough BBPoint balance to create this gift."
    }
  });
}

// Generate a random gift code
function generateGiftCode(length = 8) {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var code = "";
  for (var i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return "gift"+code;
}
var giftCode = generateGiftCode();

// Calculate prize amount per user
var prizePerUser = Math.floor(amount / totalUser);

// Prepare gift details JSON
var giftDetails = {
  giftCode: giftCode,
  password: password,
  creatorId: userId,
  amount: amount,
  description: description,
  title: title,
  claimLink: "https://t.me"+bot.name+"/start="+giftCode,
  totalUser: totalUser,
  prizePerUser: prizePerUser
};

// Add password to JSON if provided
if (password) {
  giftDetails.password = password;
}

// Save gift details
Bot.setProperty(`gift${giftCode}`, giftDetails, "json");

// Deduct amount from the target user's BBPoint balance
targetUserBBP.remove(amount);

// Save transaction history
let transactions = Bot.getProp(`transactions${userId}`) || [];
transactions.push({
  amount: amount,
  with: "Gift Creation",
  date: new Date().toLocaleDateString("en-GB"),
  type: "gift created",
  direction: "debit"
});
if (transactions.length > 5) transactions.shift(); // Keep only last 5 transactions
Bot.setProp(`transactions${userId}`, transactions, "json");

// Announcement settings
var userSettings = Bot.getProp(`${userId}settings`) || {};
var announceChannel = Bot.getProperty("transactionAnnouncement") || "@bbpTransactions";

// Send transaction announcement
if (announceChannel && userSettings.transactionAnnounce) {
  var userMention = `<a href="tg://user?id=${userId}">${userId}</a>`;

  action.sendMessage({
    chat_id: announceChannel,
    text: `🎁 <b>New Gift Created!</b>\n\n` +
          `🎟 <b>Gift Code:</b> hidden\n` +
          `💰 <b>Amount:</b> ${amount} BBP\n` +
          `👤 <b>Created By:</b> ${userMention}\n\n` +
          `🔹 <b>Total Recipients:</b> ${totalUser}`,
    parse_mode: "HTML"
  });
}

// Webhook Notification (if webhook is set)
if (userSettings.webhook && /^https?:\/\/.+/i.test(userSettings.webhook)) {
  HTTP.post({
    url: userSettings.webhook,
    body: {
      userId: userId,
      amount: amount,
      type: "gift created",
      direction: "debit",
      date: new Date().toISOString(),
      description: "Gift created successfully",
      giftCode: giftCode,
      totalRecipients: totalUser
    }
  });
}

// Send gift details to the user
action.sendMessage({
  text: `<b>🎁 Gift Details</b>\n\n<b>🎟 Gift Code:</b> ${giftCode}\n<b>🏷 Title:</b> ${title}\n<b>📝 Description:</b> ${description}\n<b>👥 Total Users:</b> ${totalUser}\n<b>🎁 Prize Per User:</b> ${prizePerUser}\n<b>💰 Total Amount:</b> ${amount}\n<b>👤 Created By:</b> <a href="tg://user?id=${userId}">${userId}</a>\n<b>🔒 Password:</b> ${password || "No password set"}`,
  chat_id: userId,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [{ text: "Copy Gift Code", copy_text: { text: giftCode } }],
      [{ text: "Share Gift Link", url: `https://t.me/share/url?url=%2A%2AGIFT%20FOR%20YOU%2A%2A%0A%0A${description}%0A%0At.me/${bot.name}?start=gift${giftCode}` }]
    ]
  }
});

// Return success response with full gift details
return WebApp.render({
  mime_type: "application/json",
  content: {
    status: "success",
    msg: "🎁 Gift successfully created!",
    giftDetails: {
      giftCode: giftCode,
      title: title,
      description: description,
      totalUsers: totalUser,
      claimLink: "https://t.me/"+bot.name+"?start=gift"+giftCode,
      prizePerUser: prizePerUser,
      totalAmount: amount,
      createdBy: userId,
      password: password || "No password set"
    }
  }
});

