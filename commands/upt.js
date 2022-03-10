module.exports.command = {
    name: "upt",
    description: "Kiểm tra thời gian bot online!",
    author: "D-Jukie",
    role: 2,
    usages: "[ ]"
}

function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.run = async (bot, message, args) => {
	const { MessageEmbed } = require("discord.js");
	const fast = require("fast-speedtest-api")
	const speedTest = new fast({
		token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
		verbose: false,
		timeout: 10000,
		https: true,
		urlCount: 5,
		bufferSize: 8,
		unit: fast.UNITS.Mbps
	});
	const resault = await speedTest.getSpeed();
	const time = process.uptime(),
		  hours = Math.floor(time / (60 * 60)),
		  minutes = Math.floor((time % (60 * 60)) / 60),
		  seconds = Math.floor(time % 60);
	const axios = require("axios")
	const pidusage = await require("pidusage")(process.pid);
	const timeStart = Date.now();
	const embed = new MessageEmbed()
		.setTitle('THỜI GIAN HOẠT ĐỘNG CỦA BOT')
		.setColor('#FF5757')
		.setDescription(`❯Time: ${hours}:${minutes}:${seconds}\n❯Ping: ${Date.now() - timeStart}ms\n❯Fast: ${resault.toFixed(0)}Mbs`)
		.setTimestamp()
		.setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
		.setFooter(`Request from ${message.author.username}`)
		.setAuthor('DisMe Bot', 'https://images-ext-1.discordapp.net/external/DvS8u0pTM1jTUSrdaM-ikP8SxDlCi6LeKI4yGyyU984/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/937132086610001930/b7ece03c57ce80ded870803dbfc4b2cd.webp?width=676&height=676', 'https://www.facebook.com/PhamVanDien.User/')
	return message.reply(embed);
}