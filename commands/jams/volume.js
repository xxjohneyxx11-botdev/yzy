const Discord = require('discord.js');

const errorr = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`noting currently playing\`\`\``)

const embed2 = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`volume cant go past 10%\`\`\``)

const erro = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`voice channel connection required\`\`\``)

const unknown = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`unknown error please try again\`\`\``)

module.exports = {
    name: 'volume',
    description: "volume <volume>",
    async execute(client, message, args, ops) {
        const serverQueue = ops.queue.get(message.guild.id);
        const embed = new Discord.MessageEmbed()
        .setDescription(`the current volume is: \`${serverQueue.volume}%\``)
        .setColor(0x0189ff)
        const embed1 = new Discord.MessageEmbed()
        .setDescription(`set the volume to \`${args[0]}%\``)
        .setColor(0x0189ff)
        if (!process.env.CADEN_ID.includes(message.author.id)) return message.channel.send(embed)
        const {
            channel
        } = message.member.voice;
        if (!channel) return message.channel.send(erro);
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send(erro);
        }
        if (!serverQueue) return message.channel.send(errorr);
        if (!args[0]) return message.channel.send(embed);
        try {
            if (args[0] > 10) return message.channel.send(embed2)
            if (args[0] < 0) return message.channel.send(embed2)
            serverQueue.volume = args[0];
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
            return message.channel.send(embed1);
        } catch {
            return message.channel.send(unknown);
        }
    }
}