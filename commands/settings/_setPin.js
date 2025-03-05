/*CMD
  command: /setPin
  help: 
  need_reply: false
  auto_retry_time: 
  folder: settings

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (chat.chat_type !== "private") {
  return;
}
var pin = User.getProp("pin", "Not Set")
if (!params) {
  return Bot.sendMessage("Please send me the command with your pin. current pin is "+pin+". Your pin must be between 4 to 6 characters.\n\nExample: `/setPin 1234`", { parse_mode: "Markdown" });
}

var pin = params.trim();

// Validate pin length
if (pin.length < 4 || pin.length > 6) {
  return Bot.sendMessage("❌ Invalid pin length. Your pin must be at least 4 characters and no more than 6 characters.");
}

// Store the pin in the user's properties
Bot.setProperty("pin" + user.telegramid, pin, "string");

// Confirm the pin has been set
Bot.sendMessage("✅ Your pin has been successfully set! Use this pin for secure transactions.\n\nYou can retrieve it anytime using `/myPin`.");
