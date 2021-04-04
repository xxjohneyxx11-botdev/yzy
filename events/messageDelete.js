const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = (Discord, client, message) => {

    if (message.channel.type == 'dm') return
    if (message.author.bot) return;
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return

    const channell = db.get(`modlogs_${message.guild.id}`)
    const channel = message.guild.channels.cache.get(channell);
    if (!channel) return;

    if (message.channel.id === channell) return
    /*
    const embed1 = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`<:news:824460711220215879> **message by** <@${message.author.id}> **deleted in** <#${message.channel.id}>`)
    .addField('MESSAGE:', `\`\`\`fix\ntoo long to display\`\`\``)
    .setFooter(`MSG ID: ${message.id} | USER ID: ${message.author.id}`)
    .setColor(0x0189ff)
    .setTimestamp()

    if (message.length > 999) return channel.send(embed1)
    */
    const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`<:news:824460711220215879> **message by** <@${message.author.id}> **deleted in** <#${message.channel.id}>`)
    .addField('MESSAGE:', `\`\`\`fix\n${message.content}\`\`\``)
    .setFooter(`MSG ID: ${message.id} | USER ID: ${message.author.id}`)
    .setColor(0x0189ff)
    .setTimestamp()

    channel.send(embed)
}