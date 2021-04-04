const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = (Discord, client, oldEmoji, newEmoji) => {

    const channell = db.get(`modlogs_${oldEmoji.guild.id}`)
    const channel = oldEmoji.guild.channels.cache.get(channell);
    if (!channel) return;

    const embed = new MessageEmbed()
    //.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`<:news:824460711220215879> **emoji updated**`)
    .addField('OLD NAME:', `\`\`\`fix\n:${oldEmoji.name}:\`\`\``)
    .addField('NEW NAME:', `\`\`\`fix\n:${newEmoji.name}:\`\`\``)
    .setFooter(`ID: ${oldEmoji.id}`)
    .setColor(0x0189ff)
    .setTimestamp()

    channel.send(embed)
}