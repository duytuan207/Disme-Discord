const logger = require("./log");
const config = require("./config.json");
const Discord = require("discord.js");
const { writeFileSync, readdir } = require('fs-extra');
const pathA = require('path');
const path = pathA.join(__dirname, 'database', 'data.json');
const datauser = require('./database/data.json');
const db = require("quick.db");
const main = new Discord.Client();
main.commands = new Discord.Collection();
main.on("ready", async () => {
    logger(`============${config.nameBot}==========`, '[INFO]');
    logger(`============${main.user.tag}==========`, '[INFO]');
    logger(`Bắt đầu khởi động BOT`, '[START BOT]');
    main.user.setActivity(config.prefix + "help", { type: 2 }).catch(console.error);
    main.generateInvite({
        permissions: ['ADMINISTRATOR'],
    })
        .then(link => logger(link, '[LINK INVITE]'));
});
// load commands
readdir("./commands/", (error, files) => {
    if (error) { console.error(error) };
    let moduleBot = files.filter(i => i.split(".").pop() === "js");
    if (moduleBot.length <= 0) return logger.error("Khong tim thay lenh", '[ERROR]');
    var count = 0
    moduleBot.forEach((js, i) => {
        count++
        let scripts = require(`./commands/${js}`);
        main.commands.set(scripts.command.name, scripts);
    logger.loader(`Tải thành công lệnh: ${scripts.command.name}`) 
    });
    logger.loader(`Tải thành công ${count} lệnh!`) 
});
//reaction

// main.on('message', message => {
//     message.awaitReactions((reaction, user) => 
//         console.log({
//             senderID: reaction,
//             message: user
//         }
//     ))
// });
main.on('messageReactionAdd', async (reaction, user) => {
    if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();
    if(user.bot) return;
    let emote = await db.get(`emoteid_${reaction.message.guild.id}_${reaction.emoji.id}`)
    if(!emote) return;
    let messageid = await db.get(`message_${reaction.message.guild.id}_${reaction.emoji.id}`)
    if(!messageid) return;
    let role = await db.get(`role_${reaction.message.guild.id}_${reaction.emoji.id}`)
    if(!role) return;
    if(reaction.message.id == messageid && reaction.emoji.id == `${emote}`) {
        reaction.message.guild.members.fetch(user).then(member => {
            let embed = new Discord.MessageEmbed()
                .setAuthor(user.username , user.displayAvatarURL())
                .setDescription(`🚫 **Bạn đã có ${reaction.message.guild.roles.cache.get(role).name}** `)
                .setFooter(`${cliemainnt.user.username}`, main.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setColor(`RED`)
            if(member.roles.cache.has(role)) return user.send(embed)
            let sucsses = new Discord.MessageEmbed()
                .setAuthor(user.username, user.displayAvatarURL())
                .setDescription(`🆗 **${reaction.message.guild.roles.cache.get(role).name}** Đã được thêm vào trên ${reaction.message.guild.name}`)
                .setFooter(`${main.user.username}`, main.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setColor(`RED`)
            member.roles.add(role) 
            return user.send(sucsses)
        })
    }
})
//commands
main.on("message", async message => { 
    if (message.author.bot) return;
    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let cmd = main.commands.get(command.slice(config.prefix.length));
    let color = ['\x1b[31m', '\x1b[32m', '\x1b[33m', '\x1b[34m', '\x1b[35m', '\x1b[36m']
    let rdcl1 = color[Math.floor(Math.random() * color.length)]; 
    let rdcl2 = color[Math.floor(Math.random() * color.length)]; 
    let rdcl3 = color[Math.floor(Math.random() * color.length)];  
    let rdcl4 = color[Math.floor(Math.random() * color.length)];  
    if (cmd) {
    var permssion = 0;
    const find = message.member.hasPermission(["MANAGE_GUILD"])
    if (config.ADMINBOT.includes(message.author.id.toString())) {
        permssion = 2;
    }
    else if (!config.ADMINBOT.includes(message.author.id.toString()) && find == true) {
        permssion = 1;
    }
    if (cmd.command.role > permssion) return message.channel.send('Bạn không đủ quyền hạn để sử dụng lệnh này!')
    cmd.run(main, message, args)
    logger(`${rdcl1}Sử dụng lệnh ${rdcl2}[${cmd.command.name}] ${rdcl3}tại ${rdcl4}[${message.guild.name}]`, '[DEV]')
    }
});
//create data && event
main.on("message", async message => { 
    if (message.author.bot) return;
    if (datauser.some(i => i.threadID == message.channel.guild.id) == false) {
        var data = [];
        var threadID = message.channel.guild.id
        var name = message.author.username
        var senderID = message.author.id;
        var exp = 1;
        var money = 100;
        var avatar = message.author.avatar
            data.push({ name, senderID, exp, money, avatar })
            datauser.push({ threadID, nameServer: message.channel.guild.name, data: data });
            writeFileSync(path, JSON.stringify(datauser, null, 2));
    }
    else {
        var threadData = datauser.find(i => i.threadID == message.channel.guild.id)
        if (threadData.data.some(i => i.senderID == message.author.id) == false) {
            var name = message.author.username
            var senderID = message.author.id;
            var exp = 1;
            var money = 100;
            var avatar = message.author.avatar
                threadData.data.push({ name, senderID, exp, money, avatar })
                writeFileSync(path, JSON.stringify(datauser, null, 2));
        }
        else {
            var userData = threadData.data.find(i => i.senderID == message.author.id);
                userData.exp = userData.exp + 1;
                userData.name = message.author.username
                userData.avatar = message.author.avatar
                writeFileSync(path, JSON.stringify(datauser, null, 2));
        }
    }
});
//wellcome to server
main.on("guildMemberAdd", async (member) => {
	console.log(member)
    let chx = db.get(`wlctextch_${member.guild.id}`);
    if(chx === null) { return };
    let msg = `**Xin chào ${member.user}, Chào mừng bạn đến với ${member.guild.name} 👋**\n**Bạn là thành viên thứ ${member.guild.memberCount} của server**`
    const embed = new Discord.MessageEmbed()
       .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
       .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setDescription(`${msg}`)
       .setColor(`RED`)
       .setTimestamp()
       .setFooter(`${main.user.username}`, main.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    main.channels.cache.get(chx).send(msg)
})
//bye member
main.on("guildMemberRemove", async (member) => {
	console.log(member)
    let chx = db.get(`leftchannel_${member.guild.id}`);
    if(chx === null) { return };
    let msg = `**${member.user} đã tàng hình khỏi nhóm!**`
    const embed = new Discord.MessageEmbed()
       .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
       .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
       .setDescription(`${msg}`)
       .setColor(`RED`)
       .setTimestamp()
       .setFooter(`${main.user.username}`, main.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    main.channels.cache.get(chx).send(embed)
})
main.login(config.token).catch(console.error)
setTimeout(() => logger('Hoàn thành việc khởi động BOT', '[START]'), 3000)
setTimeout(() => logger('Bắt đầu nhận lệnh! :3', '[START]'), 4000)
setTimeout(() => logger.banner('=================DevMode==================='), 5000)
