/*CMD
  command: account
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

var user_id = options.user_id; // Get user_id from options
var user_name = options.user_name; // Get user_name from options

if (!user_id) {
  WebApp.render({
    content: {
      status: "error",
      msg: "The 'user_id' and 'user_name' both parameters are required."
    },
    mime_type: "application/json"
  });
  return;
}

// Fetch user balance and transactions
var balance = Libs.ResourcesLib.anotherUserRes("BBPoint", user_id);
var transactions = Bot.getProp(`transactions${user_id}`) || [];

// Calculate total transaction amount
var total = transactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

// Generate QR Code
var qrData = `{"userId": ${user_id}, "title": "${user_name || user_id}"}`;
var qrLink = "https://quickchart.io/qr?text="+encodeURIComponent(qrData)

// Prepare response
WebApp.render({
  content: {
    status: "success",
    balance: balance.value(),
    qr_code: qrLink,
    total: total.toFixed(2),
    transactions: transactions.reverse() // Show latest transactions first
  },
  mime_type: "application/json"
});

