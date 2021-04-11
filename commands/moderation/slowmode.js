const Discord = require("discord.js");
const db = require('quick.db');
const bot = new Discord.Client();

const embed = new Discord.MessageEmbed()
    .setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`slowmode <number>\`\`\``)

const embed2 = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`unknown error please try again\`\`\``)

const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `MANAGE_MESSAGES` permission')
    .setColor(0x0189ff)

const embed5 = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`cannot set slowmode above 6 hours\`\`\``)


const embed6 = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`i cant make the slowmode less than zero\`\`\``)


const embedd = new Discord.MessageEmbed()
    .setTitle('i am missing the `MANAGE_MESSAGES` permission')
    .setColor(0x0189ff)

module.exports = {
    name: 'slowmode',
    aliases: ['slow', 'setslow'],
    cooldown: 5,
    description: "slowmode <time>",
    async execute(client, message, args) {
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embedd)
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(embed3)

        if (!args[0]) return message.channel.send(embed)
        if (isNaN(args[0])) return message.channel.send(embed)

        if (args[0] > 21600) return message.channel.send(embed5)
        if (args[0] < 0) return message.channel.send(embed6)

        try {

            message.channel.setRateLimitPerUser(args[0])

            const embedd = new Discord.MessageEmbed()
                .setTitle(`success!`)
                .setDescription(`\`\`\`fix\nslowmode is now ${args[0]}s\`\`\``)
                .setColor(0x0189ff)

            message.channel.send(embedd)

            const logs = new Discord.MessageEmbed()
                .setDescription(`<:news:824460711220215879> <#${message.channel.id}> **slowmode changed by** <@${message.author.id}>`)
                .addField('NEW SLOWMODE:', `\`\`\`fix\n${args[0]}s\`\`\``)
                .setTimestamp()
                .setColor(0x0189ff)

            db.add(`casenumbers_${message.guild.id}`, 1)

            const channell = db.get(`modlogs_${message.guild.id}`)
            const channel = message.guild.channels.cache.get(channell);
            if (!channel) return;

            channel.send(logs)

        } catch {
            message.channel.send(embed2)
        }
    }

}