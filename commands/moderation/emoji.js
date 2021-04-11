const Discord = require('discord.js');
const db = require('quick.db');

const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `MANAGE_EMOJIS` permission')
    .setColor(0x0189ff)

const embedd = new Discord.MessageEmbed()
    .setTitle('i am missing the `MANAGE_EMOJIS` permission')
    .setColor(0x0189ff)

const errorr = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setDescription(`\`\`\`enter an emoji to clone\`\`\``)
    .setColor(0x0189ff)

module.exports = {
    name: 'emoji',
    aliases: ['addemoji'],
    description: "emoji <emoji>",
    async execute(client, message, args){
        
        if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) return message.channel.send(embedd)
        if(!message.member.hasPermission('MANAGE_EMOJIS')) return message.channel.send(embed3)

        if (!args[0]) return message.channel.send(errorr)

        for (const rawEmoji of args) {
            const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);

            if (parsedEmoji.id) {
                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
                message.guild.emojis.create(url, parsedEmoji.name).then((emoji) => message.channel.send(`added emoji \`:${emoji.name}:\` to this guild`))
            }
        }
    }
}