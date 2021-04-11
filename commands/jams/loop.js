const Discord = require('discord.js');

const embed = new Discord.MessageEmbed()
    .setTitle('you are missing the `MANAGE_MESSAGES` permission')
    .setColor(0x0189ff)

const errorr = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`noting currently playing\`\`\``)

const erro = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`voice channel connection required\`\`\``)

const unknown = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`unknown error please try again\`\`\``)

module.exports = {
    name: 'loop',
    description: "loop",
    async execute(client, message, args, ops) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(embed)
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(erro);
        const serverQueue = ops.queue.get(message.guild.id);
    try {
        if (!serverQueue) return message.channel.send(errorr);
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send(erro);
        }
        if (!serverQueue.loop) {
            serverQueue.loop = true;
            return message.channel.send('🔁 **loop has been enabled**');
        } else {
            serverQueue.loop = false;
            return message.channel.send('🔁 **loop has been disabled**');
        }
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send(unknown);
      }
    }
}