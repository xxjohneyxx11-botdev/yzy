const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: 'beg',
    cooldown: 30,
    description: "beg",
    execute(client, message, args) {
        let amount = Math.floor(Math.random() * 250);

        db.add(`money_${message.author.id}`, amount)
        
        const embed = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}> begged and got \`${amount}\` 💵`)
        .setColor(0x0189ff)

        message.channel.send(embed)
    }
}