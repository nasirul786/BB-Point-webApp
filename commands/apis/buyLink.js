/*CMD
  command: buyLink
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

if (!options || !options.userId || !options.amount) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ Missing required parameters: userId and amount."
    }
  });
}

// Check if userId and amount are numeric and amount is a whole number
if (isNaN(options.userId) || isNaN(options.amount) || !Number.isInteger(Number(options.amount))) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ Both userId and amount must be numeric, and amount must be a whole number."
    }
  });
}

var amount = parseInt(options.amount);
if (amount < 1) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ Invalid amount. The minimum amount must be 1."
    }
  });
}

var jsonData = {
  title: `${amount*2} BB Point`,
  description: `Buy ${amount} BB Points`,
  payload: `${options.userId} ${amount*2}`,
  provider_token: "",
  currency: "XTR",
  prices: [{ label: "BB Point Price", amount: amount }]
};

return HTTP.post({
  url: `https://api.telegram.org/bot${bot.token}/createInvoiceLink`,
  body: jsonData,
  success: "buyLink_redirect"
});

// Render while generating link
WebApp.render({
  mime_type: "application/json",
  content: {
    status: "processing",
    msg: "⏳ Generating payment link..."
  }
});

