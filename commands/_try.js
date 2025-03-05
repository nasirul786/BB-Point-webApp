/*CMD
  command: /try
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

action.refundStarPayment({
  user_id: user.telegramid,
  telegram_payment_charge_id: "stxhL81QYSa79tsBrSiMI61jXdkWdqRnJwJrLNSBiIXOHCepefiBB_kCrN0226_aocrKYfMSz64dvHXuoXzXmJDLMu1e9Ohd5YX980y4mBYymT9W6MeXu1FKHPUXJo5a6X8"
})
