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
    let onlineem = bot.emojis.cache.get('817569392946577418');
    let offlineem = bot.emojis.cache.get('817569392946577418')
    let dndem = bot.emojis.cache.get('817569392946577418')
    let idleem = bot.emojis.cache.get('817569392946577418')
    const embed = new Discord.MessageEmbed()
      .setTitle(`SERVER MEMBERS [${message.guild.members.cache.size}]`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(`
         **ONLINE:** \`${online}\` MEMBERS
         **DND:** \`${dnd}\` MEMBERS
         **IDLE:** \`${afk}\` MEMBERS
         **OFFLINE:** \`${offline}\` MEMBERS
      `)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(0x0189ff);
    message.channel.send(embed);
    }
}
