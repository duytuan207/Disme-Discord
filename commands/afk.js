module.exports.command = {
    name: "afk",
    description: "Chỉ là afk thôi!",
    author: "D-Jukie",
    role: 0,
    usages: "[time afk]"
}
module.exports.run = async (bot, message, args) => {
const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require("ms");	
        let user = message.author;
        let time = args[0];
        let reason = args.slice(1).join(' ');
        if(!time) return message.channel.send("❎ **Vui lòng chỉ định thời gian AFK**");
		const embed = new Discord.MessageEmbed()
		.setDescription(`**Bạn hiện đang AFK**`)
		.setColor('RED')
		message.channel.send(embed)
        setTimeout(function(){
			const unmute = new Discord.MessageEmbed()
			.setColor('RED')
			.setDescription(`**Bạn không còn AFK nữa**`)
			message.channel.send(user, unmute)
        }, ms(time));
}