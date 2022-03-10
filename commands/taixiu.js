module.exports.command = {
    name: "taixiu",
    description: "Tài xỉu!",
    author: "D-Jukie",
    role: 0,
    usages: "[tài/xỉu] [coins]"
}
module.exports.run = async (bot, message, args) => {
    const axios = require('axios');
    const fs = require("fs-extra");
    const user = require('./../database/data.json');
    const pathA = require('path');
    const { MessageEmbed } = require("discord.js");
    const path = pathA.join(__dirname, '../database', 'data.json');
    const uid = message.author.id 
    const findThread = user.find(i => i.threadID == message.channel.guild.id)
    const dataMoney = findThread.data.find(i => i.senderID == message.author.id)
    const moneyUser = dataMoney.money;
    if (!args[0]) return message.channel.send(sendMessage("Bạn phải cược tài hoặc xỉu..."));
    const choose = args[0]
    if (choose.toLowerCase() != 'tài' && choose.toLowerCase() != 'xỉu') return message.channel.send(sendMessage("Chỉ đặt cược tài hoặc xỉu!"));
    const money = args[1]
    if (money < 50 || isNaN(money)) return message.channel.send(sendMessage("Mức đặt cược của bạn không phù hợp hoặc dưới 50$!!!"));
    if (moneyUser < money) return message.channel.send(sendMessage(`Số dư bạn không đủ ${money}$ để có thể chơi`));
    try {
        const res = (await axios.get(`https://API.kadeeruwu.repl.co/taixiu`)).data
        const image = [];
        const result = res.result;
        if(result == false) result = '3 mặt cùng loại';
        for (let i in res.images) {
            image.push(res.images[i]);
        }
        if (choose.toLowerCase() == result) {
             dataMoney.money = dataMoney.money + parseInt(money)
            fs.writeFileSync(path, JSON.stringify(user, null, 2));
        message.channel.send(sendMessage(`🎋Bạn đã thắng \n🧧Được: ${parseInt(money)}$\n🍀Kết quả: ${result}`, image));
        } else {
            dataMoney.money = dataMoney.money - parseInt(money)
            fs.writeFileSync(path, JSON.stringify(user, null, 2));
            message.channel.send(sendMessage(`🎋Bạn đã thua \n🧧Mất: ${parseInt(money)}$\n🍀Kết quả: ${result}`, image));
        }
    } catch(e) {
        console.log(e);
        return message.channel.send(sendMessage('😌Vui lòng chờ!\n🎋lỗi không mong muốn, bot sẽ được thay api sớm nhất có thể để không ngắt sự trải nghiệm của bạn '));
    }
    function sendMessage(data, image) {
        const embed = new MessageEmbed()
            .setTitle('[====GAME TÀI XỈU===]')
            .setColor('#FF5757')
            .setDescription(data)
            .setTimestamp()
	    .setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
	    .setFooter(`Request from ${message.author.username}`)
	    .setAuthor('DisMe Bot', 'https://images-ext-1.discordapp.net/external/DvS8u0pTM1jTUSrdaM-ikP8SxDlCi6LeKI4yGyyU984/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/937132086610001930/b7ece03c57ce80ded870803dbfc4b2cd.webp?width=676&height=676', 'https://www.facebook.com/PhamVanDien.User/')
        return embed
    }
}