const Discord = require("discord.js");
const bot = new Discord.Client();
const db = require('quick.db');

module.exports = {
    name: 'messages',
    description: "messages",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

        let messages = db.get(`guildMessages_${message.guild.id}`)
        if (messages === null) messages = 0

        const embed = new Discord.MessageEmbed()
        .setTitle(`this guild has \`${messages}\` messages`)
        .setColor(0x0189ff)

        message.channel.send(embed)
    }

}