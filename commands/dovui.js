module.exports.command = {
    name: "dovui",
    description: "Trả lời các câu hỏi vui từ API!",
    author: "D-Jukie",
    role: 0,
    usages: "[ ]"
}
module.exports.run = async function (bot, message, args) {
const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const res = (await axios.get(`https://api.kadeeruwu.repl.co/game/dovui`)).data
var ans = ['A', 'B', 'C', 'D']
var msg = [];
for (let i in res.data.option) {
	msg += '`' + ans[i] + '.' + res.data.option[i] + '`\n'
}
let filter = m => m.author.id === message.author.id
const embed = new MessageEmbed()
	.setTitle('Câu hỏi dành cho bạn? (15s)')
        .setColor('#FF5757')
        .setDescription(res.data.question + '\n' + msg)
	.setTimestamp()
	.setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
	.setFooter(`Request from ${message.author.username}`);
    message.channel.send(embed).then(() => {
      message.channel.awaitMessages(filter, {
          max: 1,
          time: 15000,
          errors: ['time']
        })
        .then(message => {
          message = message.first()
	  var dapan = message.content.toUpperCase()
          if(ans.includes(dapan) !== true) return
	  var f = ans.findIndex(i => i == dapan)
	  if(res.data.option[f] == res.data.correct) {
		  message.channel.send(`Bạn đã trả lời đúng!\nĐáp án là: ${res.data.correct}`)
	  }
	  else message.channel.send(`Sai rồi!\nĐáp án là: ${res.data.correct}`)
        })
        .catch(collected => {
		console.log(collected)
            message.channel.send(`Timeout`);
        });
    })
}
