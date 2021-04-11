const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: 'daily',
    cooldown: 86400,
    description: "daily",
    execute(client, message, args) {
        let amount = 2500

        db.add(`money_${message.author.id}`, amount)

        const embed = new Discord.MessageEmbed()
            .setDescription(`<@${message.author.id}> **redeemed their daily** \`${amount}\` 💵`)
            .setColor(0x0189ff)

        message.channel.send(embed)
    }
}