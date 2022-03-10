module.exports.command = {
    name: "help",
    description: "Danh sách lệnh!",
    author: "D-Jukie",
    role: 0,
    usages: "[ ]"
}
module.exports.run = async function (bot, message, args) {
	const { MessageEmbed } = require("discord.js");
	var name = '', i = 0, commands = []
	bot.commands.forEach((cmd) => {
		i++
		commands.push(cmd.command)
		name += `*[${i}]. **${cmd.command.name}**\nMô tả: ${cmd.command.description}*\n`
	});
	name += '**Hiện có ' + i + ' lệnh có trên bot này!**'
	const embed = new MessageEmbed()
		.setTitle('[====DANH SÁCH LỆNH====]')
		.setColor('#FF5757')
		.setDescription(name)
		.setTimestamp()
		.setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
		.setFooter(`Request from ${message.author.username}`)
		.setAuthor('DisMe Bot', 'https://images-ext-1.discordapp.net/external/DvS8u0pTM1jTUSrdaM-ikP8SxDlCi6LeKI4yGyyU984/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/937132086610001930/b7ece03c57ce80ded870803dbfc4b2cd.webp?width=676&height=676', 'https://www.facebook.com/PhamVanDien.User/')
	return message.channel.send(embed);
}