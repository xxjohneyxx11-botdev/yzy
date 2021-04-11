const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = {
    name: 'members',
    description: "members",
    execute(client, message, args) {
    
    const members = message.guild.members.cache.array();
    const online = members.filter((m) => m.presence.status === 'online').length;
    const offline =  members.filter((m) => m.presence.status === 'offline').length;
    const dnd =  members.filter((m) => m.presence.status === 'dnd').length;
    const afk =  members.filter((m) => m.presence.status === 'idle').length;
    
    const embed = new Discord.MessageEmbed()
      .setTitle(`SERVER MEMBERS [${message.guild.members.cache.size}]`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(`**ONLINE:** \`${online}\`\n**DND:** \`${dnd}\`\n**IDLE:** \`${afk}\`\n**OFFLINE:** \`${offline}\``)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(0x0189ff);
    message.channel.send(embed);
    }
}
