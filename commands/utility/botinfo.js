const Discord = require("discord.js");
const { version } = require("discord.js");
const cpuStat = require("cpu-stat");
const os = require('os');
const ms = require('ms');
const db = require('quick.db');

require("../../inlineReply.js")

module.exports = {
    name: 'botinfo',
    aliases: ['bi', 'about'],
    description: "botinfo",
    execute(client, message, args) {

        const owner = client.users.cache.get('742853857104887820').tag

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
            message.channel.send(`fetching....`).then((msg) => {
                const embed = new Discord.MessageEmbed()
                    .setThumbnail('https://cdn.discordapp.com/attachments/798602236396961809/817945477613748234/download.png')
                    .setTitle(`YZY BOT INFO:`)
                    //.setDescription(`[BOT INVITE](https://discord.com/oauth2/authorize?client_id=815385417653813289&scope=bot&permissions=8)\n[SUPPORT INVITE](https://discord.gg/uKe9qjqchH)`)
                    .addField('OWNER/DEV:', `\`\`\`fix\n${owner}\`\`\``)
                    .addField('SERVERS:', `\`\`\`fix\n${client.guilds.cache.size}\`\`\``, inline = true)
                    .addField('USERS:', `\`\`\`fix\n${totalMembers}\`\`\``, inline = true)
                    .addField('CHANNELS:', `\`\`\`fix\n${client.channels.cache.size}\`\`\``, inline = true)
                    .addField('API LATENCY:', `\`\`\`fix\n${Math.round(client.ws.ping)}MS\`\`\``, inline = true)
                    .addField('CLIENT PING:', `\`\`\`fix\n${Math.floor(msg.createdTimestamp - message.createdTimestamp)}MS\`\`\``, inline = true)
                    .addField('AVERAGE:', `\`\`\`fix\n90MS\`\`\``, inline = true)
                    .addField('UPTIME:', `\`\`\`fix\n${msToTime(client.uptime) + " "}\`\`\``)
                    .addField('RAM USAGE:', `\`\`\`fix\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MBS // 750 MBS\n\`\`\``)
                    .addField('CPU:', `\`\`\`fix\nIntel(R) Xeon(R) CPU @ 2.30GHz\n\`\`\``)
                    .addField('CPU USAGE:', `\`\`\`fix\n${percent.toFixed(2)}%\n\`\`\``, inline = true)
                    .addField('CPU CORES:', `\`\`\`fix\n${totalCores}\n\`\`\``, inline = true)
                    .addField('CPU CLOCK:', `\`\`\`fix\n2299MHZ\n\`\`\``, inline = true)
                    .addField('PLATFORM:', `\`\`\`fix\n${os.arch()} ${os.platform()}\`\`\``)
                    .addField('STORAGE:', `\`\`\`fix\n56.24 MB // 2.44 GB\n\`\`\``)
                    .addField('ENVIROMENT:', `\`\`\`fix\nnode.js \n${process.version}\`\`\``, inline = true)
                    .addField('LIBRARY:', `\`\`\`fix\ndiscord.js \n${version}\`\`\``, inline = true)
                    .addField('DATABASE:', `\`\`\`fix\nquick.db \n${db.version}\`\`\``, inline = true)
                    .addField('LINKS:', `**[INVITE](https://discord.com/oauth2/authorize?client_id=815385417653813289&scope=bot&permissions=2097016054) | [SUPPORT](https://discord.gg/uKe9qjqchH) | [TOP.GG](https://top.gg/bot/815385417653813289) | [WEBSITE](https://www.youtube.com/watch?v=dQw4w9WgXcQ)**`)
                    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
                    .setColor(0x0189ff)

                setTimeout(function(){

                    msg.edit(embed);
                    msg.edit("\u200B")
        
                }, ms(1000));
            });
        })
    }
}