module.exports.command = {
    name: "balance",
    description: "Kiểm tra tiền của bạn trong server!",
    author: "D-Jukie",
    role: 0,
    usages: "[]"
}
module.exports.run = async (bot, message, args) => {
    const user = require('./../database/data.json');
    const uid = message.author.id 
    const threadData = user.find(i => i.threadID == message.channel.guild.id)
    const money = threadData.data.find(i => i.senderID == uid)
    const { MessageEmbed } = require("discord.js");
	const embed = new MessageEmbed()
		.setTitle('[====KIỂM TRA TIỀN===]')
		.setColor('#FF5757')
		.setDescription(`Số tiền bạn đang có là: ${money.money}$`)
		.setTimestamp()
		.setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
		.setFooter(`Request from ${message.author.username}`)
		.setAuthor('DisMe Bot', 'https://images-ext-1.discordapp.net/external/DvS8u0pTM1jTUSrdaM-ikP8SxDlCi6LeKI4yGyyU984/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/937132086610001930/b7ece03c57ce80ded870803dbfc4b2cd.webp?width=676&height=676', 'https://www.facebook.com/PhamVanDien.User/')
    return message.channel.send(embed);   
}

