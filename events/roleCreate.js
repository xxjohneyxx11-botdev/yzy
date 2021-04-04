const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = (Discord, client, role) => {

    const channell = db.get(`modlogs_${role.guild.id}`)
    const channel = role.guild.channels.cache.get(channell);
    if (!channel) return;

    const embed = new MessageEmbed()
    //.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`<:news:824460711220215879> **new role created**`)
    .addField('ROLE:', `\`\`\`fix\n@${role.name}\`\`\``)
    .setFooter(`ID: ${role.id}`)
    .setColor(0x0189ff)
    .setTimestamp()

    channel.send(embed)
}