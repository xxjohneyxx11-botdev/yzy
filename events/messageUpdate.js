const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = (Discord, client, oldMessage, newMessage) => {

    if (oldMessage.channel.type == 'dm') return
    if (oldMessage.author.bot) return;
    if (!oldMessage.guild.me.hasPermission("SEND_MESSAGES")) return

    const channell = db.get(`modlogs_${oldMessage.guild.id}`)
    const channel = oldMessage.guild.channels.cache.get(channell);
    if (!channel) return;

    if (oldMessage.channel.id === channell) return
    /*
    let oldmsg = `${oldMessage.content}`
    let newmsg = `${newMessage.content}`

    if (newMessage.length > 800) newmsg = 'too long to display'
    if (oldMessage.length > 800) oldmsg = 'too long to display'
    */

    const embed = new MessageEmbed()
    .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`<:news:824460711220215879> **message by** <@${oldMessage.author.id}> **edited in** <#${oldMessage.channel.id}>`)
    .addField('OLD MESSAGE:', `\`\`\`fix\n${oldMessage.content}\`\`\``)
    .addField('NEW MESSAGE:', `\`\`\`fix\n${newMessage.content}\`\`\``)
    .setFooter(`MSG ID: ${oldMessage.id} | USER ID: ${oldMessage.author.id}`)
    .setColor(0x0189ff)
    .setTimestamp()

    channel.send(embed)
}