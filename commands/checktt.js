module.exports.command = {
    name: "checktt",
    description: "Kiểm tra tương tác của bạn trong server!",
    author: "D-Jukie",
    role: 0,
    usages: "[ /all]"
}
module.exports.run = async (bot, message, args) => {
const { MessageEmbed } = require("discord.js");
function check(data) {
	const embed = new MessageEmbed()
		.setTitle('[====KIỂM TRA TƯƠNG TÁC===]')
		.setColor('#FF5757')
		.setDescription(data)
		.setTimestamp()
		.setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
		.setFooter(`Request from ${message.author.username}`)
		.setAuthor('DisMe Bot', 'https://images-ext-1.discordapp.net/external/DvS8u0pTM1jTUSrdaM-ikP8SxDlCi6LeKI4yGyyU984/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/937132086610001930/b7ece03c57ce80ded870803dbfc4b2cd.webp?width=676&height=676', 'https://www.facebook.com/PhamVanDien.User/')
	return embed
}
    const user = require('./../database/data.json');
    const data = user.find(i => i.threadID == message.channel.guild.id)
    if (args[0] == "all") {
        var msg = "", exp = [], i = 1, count = 0
        for(const user of data.data) {
            exp.push({ name: user.name, exp: user.exp, senderID: user.senderID });
        }
        exp.sort(function (a, b) { return b.exp - a.exp });
        for (const user of exp) { 
            count += user.exp
            msg += `[${i++}]: **${user.name}** với **${user.exp}** tin nhắn.\n`
        }
        return message.channel.send(check(msg + `\nTổng số tin nhắn của nhóm là **${count}**`));
    }
    else {
        var exp = [], count = 0
        for(const user of data.data) {
            count += user.exp
            exp.push({ name: user.name, exp: user.exp, senderID: user.senderID });
        }
        exp.sort(function (a, b) { return b.exp - a.exp });
        var rank = exp.findIndex(i => i.senderID == message.author.id);
        return message.channel.send(check(`👤Tên: **${exp[rank].name}**\n🏆Rank: **${rank + 1}**\n💬Tin nhắn: **${exp[rank].exp}**\n💹Tỉ lệ tương tác: **${(exp[rank].exp/count*100).toFixed(0)}%**`));  
    }  
}

