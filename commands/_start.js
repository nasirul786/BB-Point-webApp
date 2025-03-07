/*CMD
  command: /start
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

if (chat.chat_type !== "private") {
  return;
}

// Handle Invoice Details
if (params && params.includes("invoice")) {
  var invoiceId = params;

  if (!invoiceId) {
    return Api.sendMessage({
      text: "❌ Invalid invoice ID provided."
    });
  }

  var invoice = Bot.getProp(invoiceId);

  if (!invoice) {
    return Api.sendMessage({
      text: "⚠️ The invoice you provided is invalid or does not exist."
    });
  }

  return Api.sendPhoto({
    photo: invoice.qrCode || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUWXMIz6lxRPObYZPNOcf9NnzWxIAFYzPFfA&usqp=CAU",
    caption: `<b>🧾 Invoice Details</b>\n\n` +
             `🔖 <b>Title:</b> ${invoice.title}\n` +
             `💰 <b>Amount:</b> ${invoice.amount} BBP\n` +
             `📝 <b>Description:</b> ${invoice.description || "No description provided."}`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [{ text: "💳 Pay Invoice", callback_data: `/payInvoice ${invoiceId}` }]
      ]
    }
  });
}

// Handle Gift Details
if (params && params.includes("gift")) {
  var giftDetails = Bot.getProp(params);

  if (!giftDetails) {
    return Api.sendMessage({
      text: "⚠️ The gift code you provided is invalid or does not exist."
    });
  }

  return Api.sendMessage({
    text: `<b>🎁 Gift Details</b>\n\n` +
          `<b>🎟 Gift Code:</b> ${giftDetails.giftCode}\n` +
          `<b>🏷 Title:</b> ${giftDetails.title}\n` +
          `<b>📝 Description:</b> ${giftDetails.description}\n` +
          `<b>👥 Total Users:</b> ${giftDetails.totalUser}\n` +
          `<b>🎁 Prize Per User:</b> ${giftDetails.prizePerUser}\n` +
          `<b>💰 Total Amount:</b> ${giftDetails.amount}\n` +
          `<b>👤 Created By:</b> <a href="tg://user?id=${giftDetails.creatorId}">${giftDetails.creatorId}</a>\n` +
          `<b>🔒 Password:</b> ${giftDetails.password || "No password set"}`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📋 Copy Gift Code", copy_text: { text: giftDetails.giftCode } }],
        [{ text: "🔗 Share Gift Link", url: `https://t.me/share/url?url=%2A%2AGIFT%20FOR%20YOU%2A%2A%0A${giftDetails.description}%0A%0At.me/${bot.name}?start=gift${giftDetails.giftCode}` } ]
      ]
    }
  });
}

// If no invoice or gift, send the main menu
var url = WebApp.getUrl({ 
  command: "apps",
  options: { page: "main" }
});

Api.sendMessage({
  text: "👋 Hello! I am BB Point Bot – your secure payment solution.\n\n" +
        "🔐 Built with transparency and security, our WebApp has its own API and open-source documentation.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [{ text: "💎 Check Balance", callback_data: "/balance" }, { text: "💱 Exchange Points", callback_data: "/exchange" }],
      [{ text: "📖 API & Docs", url: "https://captain-1.gitbook.io/bb-point-api" }],
      [{ text: "🌐 Open WebApp", web_app: { url: url }}, { text: "💳 Make a Payment", callback_data: "/payment" }]
    ]
  }
});


// delete the previous message if the command triggered from an inline image 
if (request.message && request.message.message_id) {
  Api.deleteMessage({
    message_id: request.message?.message_id
  })
}
