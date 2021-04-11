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
    name: 'skip',
    description: "skip",
    async execute(client, message, args, ops) {
        const {
            channel
        } = message.member.voice;
        if (!channel) return message.channel.send(erro);
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send(erro);
        }
        const serverQueue = ops.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(errorr);
        try {
            serverQueue.connection.dispatcher.end();
            const msg = await message.channel.send('⏩ **skipped**')
            setTimeout(() => msg.delete(), 2000)
            return;
        } catch {
            serverQueue.connection.dispatcher.end();
            ops.queue.delete(message.guild.id);
            await channel.leave();
            return message.channel.send(unknown)
        }
    }
}