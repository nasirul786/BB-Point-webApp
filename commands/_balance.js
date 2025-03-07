/*CMD
  command: /balance
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 💎 balance
  group: 
CMD*/

if (chat.chat_type !== "private") {
  return
}

let res = Libs.ResourcesLib.userRes("BBPoint")

if (params) {
  if (admins.includes(user.telegramid)) {
    let amount = parseFloat(params)
    if (!isNaN(amount) && amount > 0) {
      res.add(amount)
      Bot.sendMessage(
        `✅ Successfully added <b>${amount} BBP</b> to balance.`,
        { parse_mode: "HTML" }
      )
    } else {
      Bot.sendMessage("❌ Invalid amount. Please enter a valid number.")
    }
  }
}

Api.sendMessage({
  text: `👤 <b>${user.first_name}</b>\n💰 <b>Balance:</b> ${res.value()} 💎`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[{ text: "🔙 Back", callback_data: "/start" }]]
  }
})

// delete the previous message if the command triggered from an inline image 
if (request.message && request.message.message_id) {
  Api.deleteMessage({
    message_id: request.message?.message_id
  })
}

