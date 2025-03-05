/*CMD
  command: claim-gift
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

const giftCode = options.giftCode;
const userId = options.userId;
const providedPassword = options.password || null;


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
if (!giftCode || !userId) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ Missing required parameters: giftCode and userId."
    }
  });
}

// Validate user to prevent wrong claims
const userPin = Bot.getProp(`pin${userId}`);
if (!userPin) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ You cannot claim any gift until you set up your pin using /setPin command."
    }
  });
}

// Retrieve gift details
const giftDetails = Bot.getProperty(`gift${giftCode}`);
if (!giftDetails) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ Invalid or expired gift code."
    }
  });
}

// Validate password if required
if (giftDetails.password && giftDetails.password !== providedPassword) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ Incorrect password. Please provide the correct password to claim this gift."
    }
  });
}

// Check if the user has already claimed this gift
if (Bot.getProp(`${userId}-${giftCode}`)) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ You have already claimed this gift."
    }
  });
}

// Retrieve the number of claims
const claimedCount = Bot.getProperty(`claimed-${giftCode}`) || 0;

// Check if there are remaining claims available
if (claimedCount >= giftDetails.totalUser) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ This gift has already been fully claimed."
    }
  });
}

// Credit the prize amount to the user
const userBBP = Libs.ResourcesLib.anotherUserRes("BBPoint", userId);
userBBP.add(giftDetails.prizePerUser);

// Mark the user as claimed
Bot.setProp(`${userId}-${giftCode}`, true);
Bot.setProperty(`claimed-${giftCode}`, claimedCount + 1, "integer");

// Save transaction history
let transactions = Bot.getProp(`transactions${userId}`) || [];
transactions.push({
  amount: giftDetails.prizePerUser,
  with: "Gift Claim",
  date: new Date().toLocaleDateString("en-GB"),
  type: "gift claim",
  direction: "credit"
});
if (transactions.length > 5) transactions.shift(); // Keep only last 5 transactions
Bot.setProp(`transactions${userId}`, transactions, "json");

// Announcement settings
const userSettings = Bot.getProp(`${userId}settings`) || {};
const announceChannel = Bot.getProperty("transactionAnnouncement") || "@bbpTransactions";

if (announceChannel && userSettings.transactionAnnounce) {
  const userMention = `<a href="tg://user?id=${userId}">${userId}</a>`;

  action.sendMessage({
    chat_id: announceChannel,
    text: `🎁 <b>Gift Claimed!</b>\n\n` +
          `🎟 <b>Gift Code:</b> hidden\n` +
          `💰 <b>Amount:</b> ${giftDetails.prizePerUser} BBP\n` +
          `👤 <b>Claimed By:</b> ${userMention}\n\n` +
          `🔹 <b>Remaining Claims:</b> ${giftDetails.totalUser - (claimedCount + 1)}`,
    parse_mode: "HTML"
  });
}

// Webhook Notification (if webhook is set)
if (userSettings.webhook && /^https?:\/\/.+/i.test(userSettings.webhook)) {
  HTTP.post({
    url: userSettings.webhook,
    body: {
      userId: userId,
      amount: giftDetails.prizePerUser,
      type: "gift claim",
      direction: "credit",
      date: new Date().toISOString(),
      description: "Gift claimed successfully",
      giftCode: giftCode
    }
  });
}

// Return success response
return WebApp.render({
  mime_type: "application/json",
  content: {
    status: "success",
    msg: "🎉 Gift successfully claimed!",
    claimDetails: {
      giftCode: giftCode,
      title: giftDetails.title,
      description: giftDetails.description,
      amountReceived: giftDetails.prizePerUser,
      totalUsers: giftDetails.totalUser,
      remainingClaims: giftDetails.totalUser - (claimedCount + 1)
    }
  }
});

