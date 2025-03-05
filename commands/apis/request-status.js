/*CMD
  command: request-status
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

if (!options.requestId) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ Missing required parameter: requestId."
    }
  });
}

var requestData = Bot.getProperty(`paymentRequest_${options.requestId}`);

if (!requestData) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: "❌ Invalid or expired request ID."
    }
  });
}

// Render request details
WebApp.render({
  mime_type: "application/json",
  content: {
    status: "success",
    requestId: options.requestId,
    requesterId: requestData.requesterId,
    requesterId: requestData.requesterId,
    amount: requestData.amount,
    note: requestData.note,
    status: requestData.status
  }
});

