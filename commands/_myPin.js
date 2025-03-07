/*CMD
  command: /myPin
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /mypin
  group: 
CMD*/

var userId = user.telegramid;
var storedPin = Bot.getProperty("pin" + userId);

if (!storedPin) {
  Api.sendMessage({
    chat_id: userId,
    text: "❌ You have not set a PIN yet.\n\nTo set your PIN, click the button below:",
    reply_markup: {
      inline_keyboard: [
        [{ text: "🔑 Set PIN", callback_data: "/setPin" }]
      ]
    }
  });
} else {
  Api.sendMessage({
    chat_id: userId,
    text: `🔐 Your PIN: <code>${storedPin}</code>\n\nTap the button below to copy your PIN.`,
    parse_mode: "html",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📋 Copy PIN", copy_text: { text: storedPin } }]
      ]
    }
  });
}


