module.exports.command = {
    name: "baucua",
    description: "Kiểm tra tiền của bạn trong server!",
    author: "D-Jukie",
    role: 0,
    usages: "[]"
}
module.exports.run = async (bot, message, args) => {
    const { MessageEmbed } = require("discord.js");
    const typ = ['bầu', 'cua', 'tôm', 'cá', 'nai', 'gà'];
    const itemOne = typ[Math.floor(Math.random() * typ.length)];
    const itemTwo = typ[Math.floor(Math.random() * typ.length)];
    const itemThree = typ[Math.floor(Math.random() * typ.length)];
    var ketqua = [itemOne, itemTwo, itemThree]

    const choosee = message.content.split(" ")
    if(typ.includes(choosee[1]) == false) return reply("Vui lòng chỉ chọn 'bầu' 'cua' 'tôm' 'cá' 'nai' 'gà'")
    if(ketqua.includes(choosee[1]) == true) {
        return reply('**Bạn đã thắng**\n*Kết quả:* ' + `${await replace(itemOne, itemTwo, itemThree)}`);
    } else {
        return reply('**Bạn đã thua**\n*Kết quả:* ' + `${await replace(itemOne, itemTwo, itemThree)}`);
    }
//==============================
function reply(data) {
    const embed = new MessageEmbed()
        .setTitle('[====BẦU CUA===]')
        .setColor('#FF5757')
        .setDescription(data)
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
        .setFooter(`Request from ${message.author.username}`)
        .setAuthor('DisMe Bot', 'https://images-ext-1.discordapp.net/external/DvS8u0pTM1jTUSrdaM-ikP8SxDlCi6LeKI4yGyyU984/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/937132086610001930/b7ece03c57ce80ded870803dbfc4b2cd.webp?width=676&height=676', 'https://www.facebook.com/PhamVanDien.User/')
     message.channel.send(embed)
} 
async function replace(itemOne, itemTwo, itemThree) {
    if (itemOne == "bầu") {
        var icon_1 = "🍐"
    }
    if (itemOne == "cua") {
        var icon_1 = "🦀"
    }
    if (itemOne == "tôm") {
        var icon_1 = "🦞"
    }
    if (itemOne == "cá") {
        var icon_1 = "🐟"
    }
    if (itemOne == "nai") {
        var icon_1 = "🦌"
    }
    if (itemOne == "gà") {
        var icon_1 = "🐓"
    }
    if (itemTwo == "bầu") {
        var icon_2 = "🍐"
    }
    if (itemTwo == "cua") {
        var icon_2 = "🦀"
    }
    if (itemTwo == "tôm") {
        var icon_2 = "🦞"
    }
    if (itemTwo == "cá") {
        var icon_2 = "🐟"
    }
    if (itemTwo == "nai") {
        var icon_2 = "🦌"
    }
    if (itemTwo == "gà") {
        var icon_2 = "🐓"
    }
    if (itemThree == "bầu") {
        var icon_3 = "🍐"
    }
    if (itemThree == "cua") {
        var icon_3 = "🦀"
    }
    if (itemThree == "tôm") {
        var icon_3 = "🦞"
    }
    if (itemThree == "cá") {
        var icon_3 = "🐟"
    }
    if (itemThree == "nai") {
        var icon_3 = "🦌"
    }
    if (itemThree == "gà") {
        var icon_3 = "🐓"
    }
    var msg = `${icon_1} | ${icon_2} | ${icon_3}`
    return msg
}
function checkPlayer(type) {
	
}
}
