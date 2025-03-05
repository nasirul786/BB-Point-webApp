/*CMD
  command: /balance
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 💎 balance
  group: 
CMD*/

if(chat.chat_type!="private"){ return }
let res = Libs.ResourcesLib.userRes("BBPoint");

if (params) {
  res.add(parseFloat(params))
  Bot.sendMessage("Added "+params+" To balance")
  return;
}

Bot.sendMessage("You have: " + res.value() + "💎");

