module.exports.command = {
    name: "infouser",
    description: "Xem thông tin người dùng discord!",
    author: "D-Jukie",
    role: 0,
    usages: "[tag/ ]"
}
module.exports.run = async (bot, message, args) => {
    const Discord = require("discord.js");
    const member = message.mentions.members.first() || message.member;
    let target = message.mentions.users.first() || message.author
    let inline = true
    const status = {
        online: "**Online**",
        idle: "**Rảnh rỗi**",
        dnd: "**Đừng làm phiền**",
        offline: "**Offline/Ẩn**"
    }
    let embed = new Discord.MessageEmbed()
        .setThumbnail(target.displayAvatarURL({ format: "png", dynamic: true, size: 1024}))
        .setColor(`RED`)
        .addField("📛 Tên", `**${member.user.tag}**`)
        .addField(":id: ID", `**${member.user.id}**`)
        .addField(":bust_in_silhouette: Nickname", `${member.nickname !== null ? `**Nickname:** ${member.nickname}` : "**None**"}`)
        .addField(":satellite_orbital: Trạng thái", `${status[member.user.presence.status]}`, inline, true)
        .addField(":video_game: Đang chơi", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "**Not playing**"}`)
        .addField(":calendar: Ngày tham gia Discord", `**${member.user.createdAt}**`)
        .setTimestamp()
	.setAuthor('DisMe Bot', 'https://images-ext-1.discordapp.net/external/DvS8u0pTM1jTUSrdaM-ikP8SxDlCi6LeKI4yGyyU984/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/937132086610001930/b7ece03c57ce80ded870803dbfc4b2cd.webp?width=676&height=676', 'https://www.facebook.com/PhamVanDien.User/')
        return message.channel.send(embed);
}