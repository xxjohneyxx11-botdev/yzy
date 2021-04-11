const Discord = require("discord.js");
const bot = new Discord.Client();
const db = require('quick.db');
const chalk = require('chalk');
module.exports = {
    name: 'resetprefix',
    description: "resetprefix ",
    execute(client, message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            const embed4 = new Discord.MessageEmbed()
                .setTitle('you are missing the `ADMINISTRATOR` permission')
                .setColor(0x0189ff)
            return message.reply(embed4);
        } else {
            db.delete(`prefix_${message.guild.id}`)

            const embed3 = new Discord.MessageEmbed()
                .setTitle(`successfully reset guilds prefix`)
                .setColor(0x0189ff)
            message.channel.send(embed3)
            console.log(chalk.cyan(`> prefix reset in ${message.guild.name}`))
        }
    }

}