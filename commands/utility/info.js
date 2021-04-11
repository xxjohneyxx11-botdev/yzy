const Discord = require("discord.js");
const cpuStat = require("cpu-stat")
const os = require('os');
const db = require('quick.db');

module.exports = {
    name: 'info',
    aliases: ['specs'],
    description: "info",
    async execute(client, message, args) {

        var totalMembers = 0;
        client.guilds.cache.forEach(guild => {
            var x = parseInt(guild.memberCount);
            totalMembers = totalMembers + x;
        })

        let cpuLol;
        cpuStat.usagePercent(async function (err, percent, seconds) {

            const first = new Discord.MessageEmbed()
                .addField('YZY INFO:', `\`\`\`\nC:/Users/YZY/Guilds/${message.guild.name}/${message.channel.name}> info .\n\`\`\``)
                .setColor(0x0189ff)

            const msg = await message.channel.send(first)

            const info1 = new Discord.MessageEmbed()
                .addField('YZY INFO:', `\`\`\`\nC:/Users/YZY/Guilds/${message.guild.name}/${message.channel.name}> info .\n\ngathering info from YZY bot:\n\`\`\``)
                .setColor(0x0189ff)

            const info2 = new Discord.MessageEmbed()
                .addField('YZY INFO:', `\`\`\`\nC:/Users/YZY/Guilds/${message.guild.name}/${message.channel.name}> info .\n\ngathering info from YZY bot:\n    server_count = ${client.guilds.cache.size}\n    user_count = ${totalMembers}\n    shard_count = 1\`\`\``)
                .setColor(0x0189ff)

            const version = db.get('botversion')
            const owner = client.users.cache.get('742853857104887820').tag

            const info3 = new Discord.MessageEmbed()
                .addField('YZY INFO:', `\`\`\`\nC:/Users/YZY/Guilds/${message.guild.name}/${message.channel.name}> info .\n\ngathering info from YZY bot:\n    server_count = ${client.guilds.cache.size}\n    user_count = ${totalMembers}\n    shard_count = 1\n\n    version = ${version}\n    environment = node.js\n    library = discord.js\n    developer = ${owner}\n\`\`\``)
                .setColor(0x0189ff)


            setTimeout(() => msg.edit(info1), 2000)
            setTimeout(() => msg.edit(info2), 3500)
            setTimeout(() => msg.edit(info3), 5000)

        })
    }
}