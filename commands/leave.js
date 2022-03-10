module.exports.command = {
    name: "leavevc",
    description: "leave the voice channel!",
    author: "D-Jukie",
    role: 0,
    usages: "[ ]"
}
module.exports.run = async (bot, message, args) => {
    const { MessageEmbed } = require("discord.js");
    const voiceChannel = message.member.voice.channel;
    const embed = new MessageEmbed()
        .setColor('#FF5757')
        .setDescription(`Bạn cần phải ở trong một voice để thực hiện lệnh này!!`)
	
    if(!voiceChannel) return message.channel.send(embed)
        voiceChannel.leave()
        message.react('🎸')            
}

