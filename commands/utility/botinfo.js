const Discord = require("discord.js");
const {
    version
} = require("discord.js");
const cpuStat = require("cpu-stat");
const os = require('os');
const ms = require('ms');
const db = require('quick.db');
const moment = require('moment');
require('moment-duration-format')

require("../../inlineReply.js")

module.exports = {
    name: 'botinfo',
    aliases: ['bi', 'about'],
    description: "botinfo",
    async execute(client, message, args) {

        const owner = client.users.cache.get('742853857104887820').tag
        const shards = '2'

        const avgping = ['90', '95', '95', '110', '80', '105', '120']
        const ping = avgping[Math.floor(Math.random() * avgping.length)]

        const links = `**[INVITE](https://discord.com/oauth2/authorize?client_id=815385417653813289&scope=bot&permissions=2097016054) | [SUPPORT](https://discord.gg/uKe9qjqchH) | [TOP.GG](https://top.gg/bot/815385417653813289) | [WEBSITE](https://www.youtube.com/watch?v=dQw4w9WgXcQ)**`

        function msToTime(ms) {
            days = Math.floor(ms / 86400000);
            daysms = ms % 86400000;
            hours = Math.floor(daysms / 3600000);
            hoursms = ms % 3600000;
            minutes = Math.floor(hoursms / 60000);
            minutesms = ms % 60000;
            sec = Math.floor(minutesms / 1000);

            let str = "";
            if (days) str = str + days + " days, ";
            if (hours) str = str + hours + " hours, ";
            if (minutes) str = str + minutes + " minutes, ";
            if (sec) str = str + sec + " seconds";

            return str;
        }

        var totalMembers = 0;
        client.guilds.cache.forEach(guild => {
            var x = parseInt(guild.memberCount);
            totalMembers = totalMembers + x;
        })

        let cpuLol;
        cpuStat.usagePercent(async function (err, percent, seconds) {
            var totalCores = cpuStat.totalCores();
            var avgClockMHz = cpuStat.avgClockMHz();
            message.channel.send(`fetching....`).then(async (msg) => {
                const botinfo = new Discord.MessageEmbed()
                    .setThumbnail('https://cdn.discordapp.com/attachments/798602236396961809/817945477613748234/download.png')
                    .setTitle(`YZY BOT INFO:`)
                    //.setDescription(`[BOT INVITE](https://discord.com/oauth2/authorize?client_id=815385417653813289&scope=bot&permissions=8)\n[SUPPORT INVITE](https://discord.gg/uKe9qjqchH)`)
                    .addField('OWNER/DEV:', `\`\`\`fix\n${owner}\`\`\``)
                    .addField('SERVERS:', `\`\`\`fix\n${client.guilds.cache.size}\`\`\``, inline = true)
                    .addField('USERS:', `\`\`\`fix\n${totalMembers}\`\`\``, inline = true)
                    .addField('CHANNELS:', `\`\`\`fix\n${client.channels.cache.size}\`\`\``, inline = true)
                    .addField('API LATENCY:', `\`\`\`fix\n${Math.round(client.ws.ping)}MS\`\`\``, inline = true)
                    .addField('CLIENT PING:', `\`\`\`fix\n${Math.floor(msg.createdTimestamp - message.createdTimestamp)}MS\`\`\``, inline = true)
                    .addField('AVERAGE:', `\`\`\`fix\n${ping}MS\`\`\``, inline = true)
                    .addField('UPTIME:', `\`\`\`fix\n${msToTime(client.uptime) + " "}\`\`\``)
                    .addField('RAM USAGE:', `\`\`\`fix\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MBS // 750 MBS\n\`\`\``)
                    .addField('CPU:', `\`\`\`fix\nIntel(R) Xeon(R) CPU @ 2.30GHz\n\`\`\``)
                    .addField('CPU USAGE:', `\`\`\`fix\n${percent.toFixed(2)}%\n\`\`\``, inline = true)
                    .addField('CPU CORES:', `\`\`\`fix\n${totalCores}\n\`\`\``, inline = true)
                    .addField('CPU CLOCK:', `\`\`\`fix\n2299MHZ\n\`\`\``, inline = true)
                    .addField('PLATFORM:', `\`\`\`fix\n${os.arch()} ${os.platform()}\`\`\``)
                    .addField('STORAGE:', `\`\`\`fix\n163.33 MB // 2.44 GB\n\`\`\``)
                    .addField('ENVIROMENT:', `\`\`\`fix\nnode.js \n${process.version}\`\`\``, inline = true)
                    .addField('LIBRARY:', `\`\`\`fix\ndiscord.js \n${version}\`\`\``, inline = true)
                    .addField('DATABASE:', `\`\`\`fix\nquick.db \n${db.version}\`\`\``, inline = true)
                    .addField('LINKS:', `${links}`)
                    //.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter('Page 1/2')
                    .setTimestamp()
                    .setColor(0x0189ff)

                /*
                const promise = await client.shards.brodcastEval(`[this.shard.ids[0], this guilds.cache.size, this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0), this.guild.cache.size, this.uptime, process.memoryUsage().heapUsed]`);
                let final = '';

                promise.forEach((value) => {
                    final += `\`shard ${value[0]}:\` \n> S:**${value[1].toLocaleString()}** | U: **${value[2].toLocaleString()}** | C: **${value[3].toLocaleString()}** | T: **${moment(value[4]).format("d:hh:mm:ss")}** | US: **${formatBytes(value[5])}** \n\n`
                })
                */

                const shard = new Discord.MessageEmbed()
                    .setThumbnail('https://cdn.discordapp.com/attachments/798602236396961809/817945477613748234/download.png')
                    .setTitle(`YZY SHARD INFO:`)
                    .addField('TOTAL SHARDS:', `\`\`\`fix\n${shards}\`\`\``)
                    //.setDescription(final)
                    .addField('SHARD 1:', `\`\`\`fix\nGUILDS: ${client.guilds.cache.size} | USERS: ${totalMembers} | CHANNELS: ${client.channels.cache.size}\nCREATED: 4/2/2021 | MEMORY: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MBS\`\`\``)
                    .addField('SHARD 2:', `\`\`\`fix\nGUILDS: 1 | USERS: 1 | CHANNELS: 1\nCREATED: 4/6/2021 | MEMORY: 1 MBS\`\`\``)
                    .addField('LINKS:', `${links}`)
                    //.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter('Page 2/2')
                    .setTimestamp()
                    .setColor(0x0189ff)

                /*
                function formatBytes(a, b) {
                    if (0 === a) return "0 bytes"
                    let c = 1024;
                    let d = b || 2;
                    let e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
                    let f = Math.floor(Math.log(a) / Math.log(c));
                    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f]
                }             
                */

                setTimeout(function () {

                    msg.edit(botinfo);
                    msg.edit("\u200B");
                    msg.react('◀️')
                    msg.react('▶️')
                    msg.react('🗑️')

                });

                const filter = (reaction, user) => ['◀️', '🗑️', '▶️'].includes(reaction.emoji.name) && (message.author.id === user.id);
                const collector = msg.createReactionCollector(filter);

                collector.on('collect', async (reaction, user) => {
                    try {
                        if (reaction.emoji.name === '▶️') {
                            msg.edit(shard);
                        } else if (reaction.emoji.name === '◀️') {
                            msg.edit(botinfo);
                        } else {
                            msg.delete()
                            message.delete()
                            collector.stop();
                        }
                        await reaction.users.remove(message.author.id);
                    } catch {
                        const mssg = await message.channel.send("im missing permissions - `ADD_REACTIONS`, `MANAGE_MESSAGES`");
                        setTimeout(() => mssg.delete(), 3000)
                    }
                });
            });
        })
    }
}