module.exports.command = {
    name: "rps",
    description: "Chơi kéo búa bao!",
    author: "D-Jukie",
    role: 0,
    usages: "[kéo/búa/bao]"
}
module.exports.run = async (bot, message, args) => {
const Discord = require('discord.js');
const rps = ['kéo','búa', 'bao'];
const res = ['Kéo ✂️','Búa 🔨', 'Bao ✋'];
let userChoice;
    if (args.length) userChoice = args[0].toLowerCase();
    if (!rps.includes(userChoice)) return message.channel.send('**Vui lòng chọn kéo, búa hoặc bao**');
    userChoice = rps.indexOf(userChoice);
    const botChoice = Math.floor(Math.random()*3);
    let result;
    if (userChoice === botChoice) result = '**Trận này hòa**';
    else if (botChoice == 1 && userChoice == 0 || botChoice == 2 && userChoice == 1 || botChoice === 0 && userChoice === 2) result = '**Bot wins 🏆**';
    else result = `**Bạn wins 🏆**`;
    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.member.displayName} vs. Bot`)
      .addField('Bạn chọn', res[userChoice], true)
      .addField('Bot\'s chọn', res[botChoice], true)
      .addField('Kết quả', result, true)
      .setTimestamp()
      .setColor('RED')
      .setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
	.setFooter(`Request from ${message.author.username}`)
	.setAuthor('DisMe Bot', 'https://images-ext-1.discordapp.net/external/DvS8u0pTM1jTUSrdaM-ikP8SxDlCi6LeKI4yGyyU984/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/937132086610001930/b7ece03c57ce80ded870803dbfc4b2cd.webp?width=676&height=676', 'https://www.facebook.com/PhamVanDien.User/')
    message.channel.send(embed);
}