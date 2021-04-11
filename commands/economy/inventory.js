const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: 'inventory',
    description: "inventory <@user>",
    execute(client, message, args) {
        let user = message.mentions.users.first() || message.author;

        let money = db.get(`money_${user.id}`)
        if (money === null) money = 0

        let inv = db.get(`inventory_${user.id}`)
        if (inv === null) inv = 'empty'


        const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s inventory`)
        .setDescription(`**${inv}**`)
        .setFooter(`you have ${money} dollars in your wallet`)
        .setColor(0x0189ff)

        message.channel.send(embed)
    }
}