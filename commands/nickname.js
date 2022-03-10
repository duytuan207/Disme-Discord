module.exports.command = {
    name: "setname",
    description: "Thay đổi tên của các thành viên trong đoạn chat!",
    author: "D-Jukie",
    role: 1,
    usages: "[tag] [nickname]"
}
module.exports.run = async (bot, message, args) => {
  if(!message.guild.me.hasPermission(["CHANGE_NICKNAME"])) { 
    return message.channel.send({embed: {color: 'RED', description: '❎ **Bot không có quyền thực hiện điều này! | Quyền hạn: CHANGE_NICKNAME**'}})
  }
  let user = message.mentions.users.first(); 
  if (!user) return message.channel.send({embed: {color: 'RED', description: "❎ **Cần tag người dùng cần thay đổi tên!**"}});
  
  let nick = args.slice(1).join(" ");
  if (!nick) return message.channel.send({embed: {color: 'RED', description: "❎ **Vui lòng nhập tên cần đổi**"}});
  let member = message.guild.members.cache.get(user.id);
  await member.setNickname(nick).catch(err => message.channel.send({embed: {color: 'RED', description: `Error: ${err}`}}));
  return message.channel.send({embed: {color: 'RED', description: `✅ **Thay đổi tên thành công từ** **${user.tag}** **thành** **${nick}**`}});
}