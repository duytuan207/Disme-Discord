module.exports.command = {
    name: "vote",
    description: "Tạo cuộc vote trong nhóm của bạn!",
    author: "D-Jukie",
    role: 0,
    usages: "[ ]"
}

module.exports.run = async (bot, message, args) => {
	const { MessageEmbed } = require("discord.js");
	function check(data) {
		const embed = new MessageEmbed()
			.setTitle('[====VOTE===]')
			.setColor('#FF5757')
			.setDescription(data)
			.setTimestamp()
			.setThumbnail("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg")
			.setFooter(`Request from ${message.author.username}`);
		return embed
	}
	const agree = '✅';
	const disagree = '❎';
	let msg = await message.channel.send(check("Bắt đầu vote!\nThời gian 15s"));
	await msg.react(agree);
	await msg.react(disagree);
	const reactions = await msg.awaitReactions(reaction => reaction.emoji.name == agree || reaction.emoji.name == disagree, { time: 15000 });
	message.channel.send(check(`Kết thúc vote! \n\n${agree}: ${reactions.get(agree).count}\n${disagree}: ${reactions.get(disagree).count}`));
}