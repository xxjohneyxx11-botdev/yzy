const Discord = require("discord.js");
const bot = new Discord.Client();
const embed = new Discord.MessageEmbed()
    .setTitle('please provide a guild id')
    .setColor(0x0189ff)
const embed2 = new Discord.MessageEmbed()
    .setTitle('couldnt find guild')
    .setColor(0x0189ff)
module.exports = {
    name: 'leaveguild',
    description: "leaveguild <guild id>",
    async execute(client, message, args) {
        if (!process.env.CADEN_ID.includes(message.author.id)) {
            return message.channel.send('sorry only my owner can use this command <:kek:817934784998146059>')
        } else {
            const guildid = args[0]
            if (!args[0]) return message.channel.send(embed)
            const guild = message.client.guilds.cache.get(guildid)
            if (!guild) return message.channel.send(embed2)
            await guild.leave();
            const embed3 = new Discord.MessageEmbed()
                .setTitle(`successfully left **${guild.name}**`)
                .setColor(0x0189ff)
            message.channel.send(embed3)
        }
    }

}