const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: 'balance',
    aliases: ['bal', 'wallet'],
    description: "bal <@user>",
    execute(client, message, args) {
        let user = message.mentions.users.first() || message.author;

        let money = db.get(`money_${user.id}`)
        if (money === null) money = 0

        let bank = db.get(`bank_${user.id}`)
        if (bank === null) bank = 0

        const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s balance`)
        .setDescription(`**wallet:** \`${money}\` 💵\n**bank:** \`${bank}\` 💵`)
        .setColor(0x0189ff)

        message.channel.send(embed)
    }
}