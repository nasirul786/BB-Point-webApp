/*CMD
  command: /myQr
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /myqr
  group: 
CMD*/

var qrData = `{"userId": ${user.telegramid}, "title": "${user.first_name}"}`;
var qr = "https://quickchart.io/qr?text="+encodeURIComponent(qrData)

Api.sendPhoto({
  photo: qr,
  caption: "*Scan this QR Code to receive payment*",
  parse_mode: "markdown"
})
