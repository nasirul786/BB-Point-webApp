/*CMD
  command: invoice-status
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

const { invoiceId, pin } = options;

// Validate required parameters
if (!invoiceId || !pin) {
  return WebApp.render({
    content: { status: "error", msg: "Missing required parameters: invoiceId and pin are required." },
    mime_type: "application/json"
  });
}

// Fetch invoice details
let invoice = Bot.getProp(invoiceId);
if (!invoice) {
  return WebApp.render({
    content: { status: "error", msg: "Invalid invoiceId. Invoice not found." },
    mime_type: "application/json"
  });
}

// Validate user's PIN
const userPin = Bot.getProperty(`pin${invoice.userId}`);
if (!userPin) {
  return WebApp.render({
    content: { status: "error", msg: "❌ User's pin is not set. Please set a pin first." },
    mime_type: "application/json"
  });
}

if (pin !== userPin) {
  return WebApp.render({
    content: { status: "error", msg: "❌ Incorrect pin provided." },
    mime_type: "application/json"
  });
}

// Render invoice details
WebApp.render({
  content: {
    status: "success",
    invoice: {
      invoiceId: invoiceId,
      title: invoice.title || "No Title",
      amount: invoice.amount || 0,
      description: invoice.description || "No description provided.",
      status: invoice.status || "unpaid",
      paidBy: invoice.paidBy || "Not yet paid"
    }
  },
  mime_type: "application/json"
});
