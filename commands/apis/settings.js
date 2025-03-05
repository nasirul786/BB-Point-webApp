/*CMD
  command: settings
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

// Verify the PIN
if (options.pin !== userPin) {
  return WebApp.render({
    content: {
      status: "error",
      msg: "❌ Incorrect PIN. Use /myPin to retrieve it."
    },
    mime_type: "application/json"
  });
}

// Fetch user settings
var userSettings = Bot.getProp(userId + "settings") || {};

// Render response with user settings if PIN is correct
WebApp.render({
  content: {
    status: "success",
    acceptRequest: userSettings.acceptRequest !== undefined ? userSettings.acceptRequest : false,
    webhook: userSettings.webhook || "Set now",
    transactionAnnounce: userSettings.transactionAnnounce !== undefined ? userSettings.transactionAnnounce : false,
    pin: options.pin
  },
  mime_type: "application/json"
});

