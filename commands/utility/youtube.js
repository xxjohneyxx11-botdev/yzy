const {
    MessageEmbed
} = require('discord.js');
const search = require('youtube-search');
const he = require('he');
const embed3 = new MessageEmbed()
.setTitle('**invalid usage**')
.setColor(0x0189ff)
.setDescription(`\`\`\`youtube <video>\`\`\``)
module.exports = {
    name: 'youtube',
    aliases: ['yt'],
    description: 'youtube <video>',
    async execute(client, message, args) {
        const apiKey = 'AIzaSyAx9nkSt2wid8_5JclJUuaC7Gh3AEcFF7M'
        const videoName = args.join(' ');
        if (!videoName) return message.channel.send(embed3)
        const searchOptions = {
            maxResults: 1,
            key: apiKey,
            type: 'video'
        };
        if (!message.channel.nsfw) searchOptions['safeSearch'] = 'strict';
        let result = await search(videoName, searchOptions)
            .catch(err => {
                return message.channel.send('please try again in a few seconds')
            });
        result = result.results[0];
        if (!result)
            return message.channel.send('unable to find video, please provide a different youtube video')
        const decodedTitle = he.decode(result.title);
        const embed = new MessageEmbed()
            .setTitle(decodedTitle)
            .setURL(result.link)
            .setThumbnail('https://cdn1.iconfinder.com/data/icons/logotypes/32/youtube-512.png')
            .setDescription(result.description)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp()
            .setColor(0x0189ff);
        if (message.channel.nsfw) embed.setImage(result.thumbnails.high.url);
        message.channel.send(embed);

    }
}