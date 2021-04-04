const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = (Discord, client, member) => {
    const channell = db.get(`welcome_${member.guild.id}`)
    const channel = member.guild.channels.cache.get(channell);
    if (!channel) return;

    channel.send(`${member} just left :(`)

    //modlogs

    const modid = db.get(`modlogs_${member.guild.id}`)
    const modchan = member.guild.channels.cache.get(modid);
    if (!modchan) return;

    const embed = new MessageEmbed()
    //.setAuthor(member.tag, member.displayAvatarURL({ dynamic: true }))
    .setDescription(`<:news:824460711220215879> ${member} **just left**`)
    .addField('ACC CREATED:', `\`\`\`fix\n${moment(member.createdAt).format('MMM DD YYYY')}\`\`\``)
    .setFooter(`USER ID: ${member.id}`)
    .setColor(0x0189ff)
    .setTimestamp()

    modchan.send(embed)
}