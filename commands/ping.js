module.exports.command = {
    name: "ping",
    description: "Tag tất cả thành viên trong server!",
    author: "D-Jukie",
    role: 1,
    usages: "[ ]"
}
module.exports.run = async (bot, message, args) => {
    try {
        message.channel.send('@everyone');
        message.delete();
    } catch(e) {
        console.log(e);
    }           
}
