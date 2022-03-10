module.exports.command = {
    name: "avt",
    description: "Kiểm tra tiền của bạn trong server!",
    author: "D-Jukie",
    role: 0,
    usages: "[tag/ ]"
}
module.exports.run = async (bot, message, args) => {
	const Discord = require('discord.js');
    let user = message.mentions.users.first() 
  || message.author;
let avatar = user.displayAvatarURL({size: 1024, dynamic: true})
       const embed = new Discord.MessageEmbed()
        .setAuthor('DisMe Bot', 'https://images-ext-1.discordapp.net/external/DvS8u0pTM1jTUSrdaM-ikP8SxDlCi6LeKI4yGyyU984/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/937132086610001930/b7ece03c57ce80ded870803dbfc4b2cd.webp?width=676&height=676', 'https://www.facebook.com/PhamVanDien.User/')
        .setTitle(`Avatar của bạn nè!`)
        .setImage(avatar)
        .setColor("RED")
        return message.reply(embed);
}