/*CMD
  command: request
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

var requestData = options;

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

if (!requestData) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "Required parameters: userId, requesterId, pin, amount"
    }
  });
}

// Extract required parameters
var userId = requestData.userId; // Recipient's user ID
var requesterId = requestData.requesterId; // Requester's user ID
var providedPin = requestData.pin; // PIN provided by the requester
var requestAmount = requestData.amount; // Payment amount
var requestNote = requestData.note || "Pay this amount."; // Optional note

// Check for missing parameters
var missingParams = [];
if (!userId) missingParams.push("userId");
if (!requesterId) missingParams.push("requesterId");
if (!providedPin) missingParams.push("pin");
if (!requestAmount) missingParams.push("amount");

if (missingParams.length > 0) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: `Missing required parameters: ${missingParams.join(", ")}` 
    }
  });
}

// Fetch recipient's settings
var recipientSettings = Bot.getProp(`${userId}settings`) || { acceptRequest: true };

// If acceptRequest is disabled (false), do not send the request
if (recipientSettings.acceptRequest == false) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ The recipient has disabled payment requests."
    }
  });
}

// Fetch requester's PIN
var requesterPin = Bot.getProperty(`pin${requesterId}`);

if (!requesterPin) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "Your PIN is not set.\n\nTo set your PIN, use:\n`/setPin <your 6-digit PIN>`\n\nFor more details, check the documentation."
    }
  });
}

// Validate PIN
if (providedPin !== requesterPin) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "Incorrect PIN.\n\nPlease enter the correct PIN. You can retrieve your PIN by sending:\n`/myPin`"
    }
  });
}

// Generate a unique 8-character request ID
var requestId = [...Array(8)].map(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62))).join("");

// Save request details in bot property
Bot.setProperty(`paymentRequest_${requestId}`, {
  requesterId: requesterId,
  toUserId: userId,
  amount: requestAmount,
  note: requestNote,
  status: "pending"
}, "json");

// Send payment request to recipient
action.sendMessage({
  chat_id: userId,
  text: `<b>🔔 Payment Request</b>\n\n<b>Requester:</b> <a href="tg://user?id=${requesterId}">${requesterId}</a>\n<b>Amount:</b> <code>${requestAmount} BBP</code>\n\n<b>📜 Note:</b>\n${requestNote}`,
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{ text: `✅ Send ${requestAmount} BBP`, callback_data: `/requestPay ${requestId}` }],
      [{ text: `❌ Decline`, callback_data: `/requestPay NO` }]
    ]
  }
});

// Return success response
WebApp.render({
  mime_type: "application/json",
  content: {
    status: "success",
    msg: "Your payment request has been sent successfully!",
    requestId: requestId,
    amount: requestAmount,
    userId: userId,
    note: requestNote
  }
});

