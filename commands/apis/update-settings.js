/*CMD
  command: update-settings
  help: 
  need_reply: 
  auto_retry_time: 
  folder: apis
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (!options || !options.userId || !options.pin) {
  return WebApp.render({
    content: {
      status: "error",
      msg: "❌ userId and pin parameters are required."
    },
    mime_type: "application/json"
  });
}

var userId = options.userId;
var userPin = Bot.getProperty(`pin${userId}`);

if (!userPin) {
  return WebApp.render({
    content: {
      status: "error",
      msg: "❌ Your pin is not set. Please set your pin using /setPin <6-digit pin>."
    },
    mime_type: "application/json"
  });
}

// Verify PIN
if (options.pin !== userPin) {
  return WebApp.render({
    content: {
      status: "error",
      msg: "❌ Incorrect PIN. Use /myPin to retrieve it."
    },
    mime_type: "application/json"
  });
}

// Fetch existing settings or create a new object
var userSettings = Bot.getProp(userId + "settings") || {};

// Check and update settings if provided
if (options.acceptRequest !== undefined) {
  userSettings.acceptRequest = options.acceptRequest;
}

if (options.transactionAnnounce !== undefined) {
  userSettings.transactionAnnounce = options.transactionAnnounce;
}

// Validate and update webhook
if (options.newWebhook) {
  var webhookUrl = options.newWebhook.trim();
  if (!/^https?:\/\/.+/i.test(webhookUrl)) {
    return WebApp.render({
      content: {
        status: "error",
        msg: "❌ Invalid webhook URL. Please use a valid URL starting with http:// or https://."
      },
      mime_type: "application/json"
    });
  }
  userSettings.webhook = webhookUrl;
}

// Save the updated settings
Bot.setProp(userId + "settings", userSettings);

// Return success response
WebApp.render({
  content: {
    status: "success",
    msg: "✅ Settings updated successfully."
  },
  mime_type: "application/json"
});

