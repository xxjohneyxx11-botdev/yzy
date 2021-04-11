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

const num = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`enter a valid number\`\`\``)

const embed1 = new Discord.MessageEmbed()
    .setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`remove <number>\`\`\``)


module.exports = {
    name: 'remove',
    description: "remove <number>",
    async execute(client, message, args, ops) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(embed)

        if (!args[0]) return message.channel.send(embed1)

        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(erro);
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send(erro);
        };
        const serverQueue = ops.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(errorr);
      try {
        if (args[0] < 1 && args[0] >= serverQueue.songs.length) {
            return message.channel.send(num);
        }
        serverQueue.songs.splice(args[0] - 1, 1);
        return message.channel.send(`removed song number \`${args[0]}\` from queue`);
      } catch {
          serverQueue.connection.dispatcher.end();
          return message.channel.send(unknown)
      }
    }
}