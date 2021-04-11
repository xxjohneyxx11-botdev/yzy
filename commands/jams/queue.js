const {
    Util,
    MessageEmbed
} = require('discord.js');

const errorr = new MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`noting currently playing\`\`\``)

const erro = new MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`voice channel connection required\`\`\``)

const unknown = new MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`unknown error please try again\`\`\``)

const embed = new MessageEmbed()
    .setTitle('i am missing the `ADD_REACTIONS`, `MANAGE_MESSAGES` permissions')
    .setColor(0x0189ff)

module.exports = {
    name: 'queue',
    description: "queue",
    async execute(client, message, args, ops) {
        const {
            channel
        } = message.member.voice;
        if (!channel) return message.channel.send(erro);
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send(erro);
        };
        const serverQueue = ops.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(errorr);
        const embeds = generateQueueEmbed(message, serverQueue.songs);
        
        try {
            let currentPage = 0;
            const embeds = generateQueueEmbed(message, serverQueue.songs);
            const queueEmbed = await message.channel.send(`**current page -** \`${currentPage + 1}/${embeds.length}\``, embeds[currentPage]);
            await queueEmbed.react('⬅️');
            await queueEmbed.react('⏹');
            await queueEmbed.react('➡️');

            const filter = (reaction, user) => ['⬅️', '⏹', '➡️'].includes(reaction.emoji.name) && (message.author.id === user.id);
            const collector = queueEmbed.createReactionCollector(filter);

            collector.on('collect', async (reaction, user) => {
                try {
                    if (reaction.emoji.name === '➡️') {
                        if (currentPage < embeds.length - 1) {
                            currentPage++;
                            queueEmbed.edit(`**current page -** \`${currentPage + 1}/${embeds.length}\``, embeds[currentPage]);
                        }
                    } else if (reaction.emoji.name === '⬅️') {
                        if (currentPage !== 0) {
                            --currentPage;
                            queueEmbed.edit(`**current page -** \`${currentPage + 1}/${embeds.length}\``, embeds[currentPage]);
                        }
                    } else {
                        collector.stop();
                        reaction.message.reactions.removeAll();
                    }
                    await reaction.users.remove(message.author.id);
                } catch {
                    serverQueue.connection.dispatcher.end();
                    return message.channel.send(embed);
                }
            });
        } catch {
            serverQueue.connection.dispatcher.end();
            return message.channel.send(embed);
        }
        
    }
    
};

function generateQueueEmbed(message, queue) {
    const embeds = [];
    let k = 10;
    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k);
        let j = i;
        k += 10;
        const info = current.map(track => `\`${++j}.\` **-** [${track.title}](${track.url})`).join('\n');
        const embed = new MessageEmbed()
            .setTitle(`Music Queue:\n`)
            .setColor(0x0189ff)
            .setDescription(`**CURRENT SONG:**\n \`\`\`fix\n${queue[0].title}\`\`\`\n\n**up next:**\n${info}`)
            .setTimestamp();
        embeds.push(embed);
    }
    return embeds;
}
