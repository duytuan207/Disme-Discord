module.exports.command = {
    name: "linkinvite",
    description: "Lấy liên kết mời Bot vào server!",
    author: "D-Jukie",
    role: 0,
    usages: "[ ]"
}
module.exports.run = async (bot, message, args) => {
    const { MessageEmbed } = require("discord.js");
	const embed = new MessageEmbed()
		.setTitle('**Liên kết mời bot**')
		.setColor('#FF5757')
		.setDescription(`**https://discord.com/api/oauth2/authorize?client_id=937132086610001930&permissions=8&scope=bot**`)
		.setTimestamp()
		.setFooter(`Request from ${message.author.username}`);
	return message.channel.send(embed)
}