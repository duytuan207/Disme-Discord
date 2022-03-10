module.exports.command = {
    name: "play",
    description: "Phát nhạc!",
    author: "D-Jukie",
    role: 0,
    usages: "[link/keyword]"
}
module.exports.run = async (bot, message, args) => {
	const { MessageEmbed } = require("discord.js");
	const ytdl = require('ytdl-core');
	const ytSearch = require('yt-search')
	const voiceChannel = message.member.voice.channel;
	function call(content) {
		const embed = new MessageEmbed()
			.setTitle('Bot Music')
			.setColor('#FF5757')
			.setDescription(content)
			.setTimestamp()
			.setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
			.setFooter(`Request from ${message.author.username}`)
			.setAuthor('DisMe Bot', 'https://images-ext-1.discordapp.net/external/DvS8u0pTM1jTUSrdaM-ikP8SxDlCi6LeKI4yGyyU984/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/937132086610001930/b7ece03c57ce80ded870803dbfc4b2cd.webp?width=676&height=676', 'https://www.facebook.com/PhamVanDien.User/')
		return embed
	}
	if (!args.length) return message.channel.send(call('Bạn chưa nhập tên bài hát!'))
	if(!message.member.voice.channel) return message.channel.send(call('Bạn cần phải ở trong một voice để thực hiện lệnh này!!!'))
	const connection = await voiceChannel.join();
	const video = await videoFinder(args.join(' '));
	if(video){
		const stream = ytdl(video.url, {filter: 'audioonly'});
			connection.play(stream, {seek: 0, volume: 1})
			.on('finish', () => {voiceChannel.leave() });
		await message.reply(call(`*${video.title}*`));
		message.delete();
	} else return message.channel.send(call('không tìm thấy kết quả phù hợp'));
	async function videoFinder(query) {
		const videoResult = await ytSearch(query);
		return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
	}
}