/*CMD
  command: /payment
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Payment Service

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: payment
  group: 
CMD*/

var qrData = `{"userId": ${user.telegramid}, "title": "${user.first_name}"}`;
var qr = "https://quickchart.io/qr?text="+encodeURIComponent(qrData)

// Edit the message with the QR code
Api.editMessageMedia({
  message_id: request.message?.message_id,
  media: {
    type: "photo",
    media: qr,
    caption: "*📌 Your Personal Payment QR Code*\n\nScan this QR code to receive BB Points easily.\n\n💳 You can send or receive BB Points using:\n- Bot commands\n- Secure APIs\n- WebApp for a seamless experience.\n\n🔗 Tap below to access the WebApp!",
    parse_mode: "markdown"
  },
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "➕ Send Points", web_app: {url: "https://api.bots.business/v2/bots/"+bot.id+"/web-app/apps?page=pay" }},
        { text: "🔗 Request Points", web_app: {url: "https://api.bots.business/v2/bots/"+bot.id+"/web-app/apps?page=request" }}
      ],
      [
        { text: "Back", callback_data: "/start" }
      ]
    ]
  })
});

