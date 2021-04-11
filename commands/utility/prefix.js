const Discord = require("discord.js");
const bot = new Discord.Client();
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: 'prefix',
    description: "prefix",
    async execute(client, message, args) {
        let prefix = db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = 'yzy '

        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}s prefix info:`)
        .setDescription(`**this guilds prefix:** \`${prefix}\`\n**global prefix:** \`yzy \``)
        .setFooter(`example: ${prefix}help`)
        .setColor(0x0189ff)
        .setTimestamp()
        message.channel.send(embed)
    }

}