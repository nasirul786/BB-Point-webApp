/*CMD
  command: apps
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

const templates = {
  pay: "payment.html",
  main: "app.html",
  request: "request.html",
  buy: "buy.html",
  claim_gift: "claim-gift.html",
  create_gift: "create-gift.html",
  settings: "settings.html"
};

const template = templates[options.page];

if (template) {
  WebApp.render({ template });
} else {
  WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ Invalid page parameter."
    }
  });
}

