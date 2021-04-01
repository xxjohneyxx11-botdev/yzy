const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'cases',
    description: "cases",
    async execute(client, message, args){

        let cases = db.get(`casenumbers_${message.guild.id}`)
        if (cases === null) cases = 0

        message.reply(`this guild has \`${cases}\` moderation case(s)`)
    }
}