const Discord = require('discord.js');

const embed = new Discord.MessageEmbed()
    .setTitle('i am missing the `CONNECT`, `SPEAK`, `VIEW_CHANNEL` permissions')
    .setColor(0x0189ff)

const errorr = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`voice channel connection required\`\`\``)

module.exports = {
    name: 'join',
    description: "join",
    async execute(client, message, args, ops) {
        const {
            channel
        } = message.member.voice;
        const serverQueue = ops.queue.get(message.guild.id);
        if (!channel) return message.channel.send(errorr);
        if (!channel.permissionsFor(client.user).has(['CONNECT', 'SPEAK', 'VIEW_CHANNEL'])) {
            return message.channel.send(embed);
        };
        if (message.guild.me.voice.channel) return message.channel.send(errorr);

        if (serverQueue || serverQueue) {
            return message.channel.send(errorr)
        }
        await channel.join();
        return message.channel.send("**✅ joined the voice channel!**")
    }
}