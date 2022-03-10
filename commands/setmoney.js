module.exports.command = {
    name: "setmoney",
    description: "Cộng tiền cho thành viên trong server!",
    author: "D-Jukie",
    role: 2,
    usages: "[tag] [số tiền]"
}
module.exports.run = async (bot, message, args) => {
    const fs = require("fs-extra");
    const user = require('./../database/data.json');
    const pathA = require('path');
    const { MessageEmbed } = require("discord.js");
    const path = pathA.join(__dirname, '../database', 'data.json');
    let tag = message.mentions.users.first() 
    if (!tag) return message.channel.send(sendMessage("Bạn phải tag 1 người"));
    var content = args.join(" ");
    var moneySet = content.slice(content.lastIndexOf(" ") + 1);
    if (!moneySet) return message.channel.send(sendMessage("Vui lòng nhập số tiền cần cộng!"));
    var content = args.join(" ");
    const findThread = user.find(i => i.threadID == message.channel.guild.id)
    const dataMoney = findThread.data.find(i => i.senderID == tag.id)
    const money = moneySet
        dataMoney.money = dataMoney.money + parseInt(money)
        fs.writeFileSync(path, JSON.stringify(user, null, 2));
        message.channel.send(sendMessage(`Chuyển thành công cho ${money}$ cho ${tag.username}`));
    function sendMessage(data) {
        const embed = new MessageEmbed()
            .setTitle('[====SET MONEY===]')
            .setColor('#FF5757')
            .setDescription(data)
            .setTimestamp()
	    .setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
	    .setFooter(`Request from ${message.author.username}`)
	    .setAuthor('DisMe Bot', 'https://images-ext-1.discordapp.net/external/DvS8u0pTM1jTUSrdaM-ikP8SxDlCi6LeKI4yGyyU984/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/937132086610001930/b7ece03c57ce80ded870803dbfc4b2cd.webp?width=676&height=676', 'https://www.facebook.com/PhamVanDien.User/')
        return embed
    }
}