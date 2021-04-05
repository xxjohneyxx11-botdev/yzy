const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = (Discord, client, channel) => {

    //if (!channel.guild.me.hasPermission("SEND_MESSAGES")) return

    const channelll = db.get(`modlogs_${channel.guild.id}`)
    const channell = channel.guild.channels.cache.get(channelll);
    if (!channell) return;

    const embed = new MessageEmbed()
    //.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`<:news:824460711220215879> **channel created**`)
    .addField('CHANNEL:', `\`\`\`fix\n${channel.name}\`\`\``)
    .setFooter(`ID: ${channel.id}`)
    .setColor(0x0189ff)
    .setTimestamp()

    channell.send(embed)
}