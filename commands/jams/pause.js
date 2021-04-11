const Discord = require('discord.js');

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
    name: 'pause',
    description: "pause",
    async execute(client, message, args, ops) {

        const serverQueue = ops.queue.get(message.guild.id);
        const { channel } = message.member.voice;
      try {
        if (!channel) return message.channel.send(erro);
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send(erro);
        };
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause(true);
            return message.channel.send('**paused** ⏸');
        }
        return message.channel.send(errorr);
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
      }
    }
}