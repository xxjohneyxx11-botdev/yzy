const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = (Discord, client, emoji) => {

    const channell = db.get(`modlogs_${emoji.guild.id}`)
    const channel = emoji.guild.channels.cache.get(channell);
    if (!channel) return;

    const embed = new MessageEmbed()
    //.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`<:news:824460711220215879> **new emoji created**`)
    .addField('EMOJI:', `\`\`\`fix\n:${emoji.name}:\`\`\``)
    .setFooter(`ID: ${emoji.id}`)
    .setColor(0x0189ff)
    .setTimestamp()

    channel.send(embed)
}