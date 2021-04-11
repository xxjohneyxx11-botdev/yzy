const Discord = require("discord.js");
const db = require('quick.db');

const embed = new Discord.MessageEmbed()
    .setTitle('you are missing the `MANAGE_MESSAGES` permission')
    .setColor(0x0189ff)

const embed2 = new Discord.MessageEmbed()
    .setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`clear <number>\`\`\``)

const embed3 = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`enter a number under 100\`\`\``)


const embed5 = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setDescription(`\`\`\`must delete at least one message\`\`\``)
    .setColor(0x0189ff)

const embedd = new Discord.MessageEmbed()
    .setTitle('i am missing the `MANAGE_MESSAGES` permission')
    .setColor(0x0189ff)

module.exports = {
    name: 'clear',
    aliases: ['purge', 'clean'],
    description: "clear <number>",
    async execute(client, message, args) {
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embedd)
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.channel.send(embed);
        } else {

            if (!args[0]) return message.reply(embed2);

            if (isNaN(args[0])) return message.reply(embed2);

            if (args[0] > 100) return message.reply(embed3);

            if (args[0] < 1) return message.reply(embed5);

            message.delete();

            await message.channel.messages.fetch({
                limit: args[0]
            }).then(messages => {
                message.channel.bulkDelete(messages)
            });

            const embed = new Discord.MessageEmbed()
                .setDescription(`<:news:824460711220215879> **messages bulk deleted in** <#${message.channel.id}> by <@${message.author.id}>`)
                .addField('AMOUNT:', `\`\`\`fix\n${args[0]}\`\`\``)
                .setTimestamp()
                .setColor(0x0189ff)

            db.add(`casenumbers_${message.guild.id}`, 1)

            const channell = db.get(`modlogs_${message.guild.id}`)
            const channel = message.guild.channels.cache.get(channell);
            if (!channel) return;

            channel.send(embed)
        }
    }

}