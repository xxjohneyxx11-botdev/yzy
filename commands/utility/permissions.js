const Discord = require("discord.js");
const bot = new Discord.Client();
const permissions = require('../../permissions.json');

module.exports = {
    name: 'permissions',
    description: "permissions <@user>",
    async execute(client, message, args) {
        const member =  message.mentions.members.first() || 
        message.guild.members.cache.get(args[0]) || 
        message.member;
  
      // Get member permissions
      const memberPermissions = member.permissions.toArray();
      const finalPermissions = [];
      for (const permission in permissions) {
        if (memberPermissions.includes(permission)) finalPermissions.push(`+ ${permissions[permission]}`);
        else finalPermissions.push(`- ${permissions[permission]}`);
      }
  
      const embed = new Discord.MessageEmbed()
        .setTitle(`${member.username}'s permissions`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`\`\`diff\n${finalPermissions.join('\n')}\`\`\``)
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(member.displayHexColor);
      message.channel.send(embed);
    }
}