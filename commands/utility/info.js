const Discord = require("discord.js");
const cpuStat = require("cpu-stat")
const os = require('os')

module.exports = {
    name: 'info',
    aliases: ['specs'],
    description: "info",
    async execute(client, message, args) {
        let cpuLol;
        cpuStat.usagePercent(async function (err, percent, seconds) {
            message.channel.send(`fetching...`).then((msg) => {
                let good = ''
                const info = new Discord.MessageEmbed()
                    .addField('API LATENCY IS:', `\`\`\`fix\n${Math.round(client.ws.ping)}ms\n\`\`\``)
                    .addField('RAM USAGE:', `\`\`\`fix\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MBS // 750 MBS\n\`\`\``)
                    .addField('CPU USAGE:', `\`\`\`fix\n${percent.toFixed(2)}%\n\`\`\``)
                    .addField('CPU:', `\`\`\`fix\nIntel(R) Xeon(R) CPU @ 2.30GHz\n\`\`\``)
                    .addField('BLUEFOX:', `\`\`\`fix\nna2\n\`\`\``)
                    .addField('PLATFORM:', `\`\`\`fix\n${os.arch()} ${os.platform()}\n\`\`\``)
                    .setFooter('thanks for using yzy bot!')
                    .setColor(0x0189ff)
                const bruh = `**API latency is:** \`${Math.round(client.ws.ping)}ms\`\n**memory usage:** \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MBS\`\n**cpu usage:** \`${percent.toFixed(2)}%\`\n**cpu:** \`${os.cpus().map(i => `${i.model}`)[0]}\`\n**bluefox:** \`node2\`\n**platform:** \`${os.arch()} ${os.platform()}\``
                msg.edit(info);
                msg.edit("\u200B");
            });
        })
    }
}