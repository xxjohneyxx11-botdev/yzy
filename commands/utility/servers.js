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

        const servers = message.client.guilds.cache.array().map(guild => {
            return `${guild.id} - ${guild.name} - ${guild.memberCount} members`;
        });

        var totalMembers = 0;
        client.guilds.cache.forEach(guild => {
            var x = parseInt(guild.memberCount);
            totalMembers = totalMembers + x;
        })

        const bin = await sourcebin.create(
            [{
                content: `${servers.join('\n')}`,
                language: 'text',
            }, ], {
                title: 'yzy server list',
                description: `${client.guilds.cache.size} guilds\n${totalMembers} users`,
            }
        ).then(async (src) => {
            const embed = new MessageEmbed()
                .setTitle(`yzy server List [${client.guilds.cache.size}]`)
                .setDescription(`[SERVER LIST](${src.url})`)
                .setFooter('Deleting in 4 seconds')
                .setTimestamp()
                .setColor(0x0189ff)
            const reactionMessage = await message.channel.send(embed)
            setTimeout(() => reactionMessage.delete(), 4000)
            setTimeout(() => message.delete(), 4000)
        })

        /*
        try {
            src.react('❌')
        } catch (err) {
            message.channel.send('error reacting')
            throw err;
        }

        const collector = src.createReactionCollector(
            (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id),
            { dispose: true }
        )

        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case '❌':
                setTimeout(() => src.delete(), 2000);
                break;
            }
        })
        */
    }

}