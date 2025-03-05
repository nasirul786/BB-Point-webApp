/*CMD
  command: test
  help: 
  need_reply: false
  auto_retry_time: 
  folder: web pages 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Api.sendMessage({
  text: "Hello user",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "create", web_app: {url: "https://api.bots.business/v2/bots/"+bot.id+"/web-app/apps?app=create_gift"}}], [{text: "Claim", web_app: {url: "https://api.bots.business/v2/bots/"+bot.id+"/web-app/apps?app=claim_gift"}}], [{text: "Buy", web_app: {url: "https://api.bots.business/v2/bots/"+bot.id+"/web-app/apps?page=buy"}}], [{text: "request", web_app: {url: "https://api.bots.business/v2/bots/"+bot.id+"/web-app/apps?app=request"}}]
    ]
  }
})


Api.sendPhoto({
  photo: "https://quickchart.io/qr?text=%7B%20%20%20%22status%22%3A%20%22success%22%2C%20%20%20%22msg%22%3A%20%22%F0%9F%8E%81%20Gift%20successfully%20created!%22%2C%20%20%20%22giftDetails%22%3A%20%7B%20%20%20%20%20%22giftCode%22%3A%20%22IPAOJLO9%22%2C%20%20%20%20%20%22title%22%3A%20%22Birthday%20Gift%22%2C%20%20%20%20%20%22description%22%3A%20%22Happy%20Birthday!%20%F0%9F%8E%89%22%2C%20%20%20%20%20%22totalUsers%22%3A%205%2C%20%20%20%20%20%22prizePerUser%22%3A%201%2C%20%20%20%20%20%22totalAmount%22%3A%205%2C%20%20%20%20%20%22createdBy%22%3A%20%227378059553%22%2C%20%20%20%20%20%22password%22%3A%20%22No%20password%20set%22%20%20%20%7D%20%7D&size=200"
})
