const sourcebin = require('sourcebin');
const {
    MessageEmbed,
    ReactionCollector
} = require('discord.js');

module.exports = {
    name: 'servers',
    description: "servers",
    async execute(client, message, args) {
        if (!process.env.CADEN_ID.includes(message.author.id)) return message.channel.send('sorry only my owner can use this command <:kek:817934784998146059>')

        const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)

        const description = guilds.map((guild, index) => {
            return `${guild.id} - ${guild.name} - ${guild.memberCount} members`
        }).join('\n')

        var totalMembers = 0;
        client.guilds.cache.forEach(guild => {
            var x = parseInt(guild.memberCount);
            totalMembers = totalMembers + x;
        })

        const bin = await sourcebin.create( [ { content: `${description}`,language: 'text',}, ], {title: 'yzy server list', description: `${client.guilds.cache.size} guilds\n${totalMembers} users`, }
        ).then(async (src) => {
            const embed = new MessageEmbed()
                .setDescription(`[SERVER LIST](${src.url})`)
                .setFooter('Deleting in 4 seconds')
                .setTimestamp()
                .setColor(0x0189ff)
            const reactionMessage = await message.channel.send(embed)
            setTimeout(() => reactionMessage.delete(), 4000)
            setTimeout(() => message.delete(), 4000)
        })
    }

}