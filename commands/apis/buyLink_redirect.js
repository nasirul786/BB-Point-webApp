/*CMD
  command: buyLink_redirect
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

var response = JSON.parse(content)
if (response.ok && response.result) {
  return WebApp.render({
    mime_type: "application/json",
    content: {
      status: "success",
      msg: "✅ Invoice link generated successfully.",
      link: response.result
    }
  })
} else {
  WebApp.render({
    mime_type: "application/json",
    content: {
      status: "error",
      msg: `❌ Failed to generate invoice: ${response.description ||
        "Unknown error"}`
    }
  })
}

