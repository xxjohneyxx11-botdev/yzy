const {
    Util,
    MessageEmbed
} = require('discord.js');
const GOOGLE_API_KEY = 'AIzaSyAI1GLAVxobTJ0A9MWOXsP-_j35xKtvqS8'
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const db = require('quick.db');

const embed = new Discord.MessageEmbed()
    .setTitle('i am missing the `CONNECT`, `SPEAK` permissions')
    .setColor(0x0189ff)

const embed1 = new Discord.MessageEmbed()
    .setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`play <song/url>\`\`\``)

const erro = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`voice channel connection required\`\`\``)

const errorr = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`no video found, try searching via name (key may have met quora)\`\`\``)

module.exports = {
    name: 'play',
    aliases: ['p'],
    cooldown: 10,
    description: "play <song/url>",
    async execute(client, message, args, ops) {

        if (!args[0]) return message.channel.send(embed1)
        args = message.content.split(' ');
        const searchString = args.slice(1).join(' ');
        const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';

        const {
            channel
        } = message.member.voice;
        if (!channel) return message.channel.send(erro);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send(embed);
        if (!permissions.has('SPEAK')) return message.channel.send(embed);

        const msg = await message.channel.send(`searching...`);
        setTimeout(() => msg.delete(), 2000)

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();

            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, message, channel, true);
            }
            return message.channel.send(`playlist \`${playlist.title}\` has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 1);
                    var video = await youtube.getVideoByID(videos[0].id);
                } catch (err) {
                    console.error(err)
                    return message.channel.send(errorr)
                }
            }
            return handleVideo(video, message, channel);
        }
        async function handleVideo(video, message, channel, playlist = false) {
            const serverQueue = ops.queue.get(message.guild.id);
            const songInfo = await ytdl.getInfo(video.id);
            const song = {
                id: video.id,
                title: Util.escapeMarkdown(video.title),
                channel: video.channel,
                url: `https://www.youtube.com/watch?v=${video.id}`,
                thumbnail: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
                duration: video.duration,
                time: songInfo.videoDetails.lengthSeconds
            };

            let npmin = Math.floor(song.time / 60);
            let npsec = song.time - npmin * 60
            let np = `${npmin}:${npsec}`.split(' ')

            if (serverQueue) {
                serverQueue.songs.push(song);
                if (playlist) return undefined;
                else {
                    const sembed = new MessageEmbed()
                        .setColor(0x0189ff)
                        //.setDescription(`[SONG ADDED TO QUEUE!](${song.url})`)
                        .setThumbnail(song.thumbnail)
                        .setTimestamp()
                        .addField('ADDED TO QUEUE:', `\`\`\`fix\n${song.title}\`\`\``)
                        .addField('DURATION:', `\`\`\`fix\n${np}\`\`\``)
                        .setFooter(`Requested by: ${message.author.tag}`);
                    message.channel.send(sembed)
                }
                return undefined;
            }

            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: channel,
                connection: null,
                songs: [],
                volume: 3,
                playing: true,
                loop: false,
            };
            ops.queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);
            try {
                const connection = await channel.join();
                queueConstruct.connection = connection;
                play(queueConstruct.songs[0]);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error.message}`);
                ops.queue.delete(message.guild.id);
                await channel.leave();
                return message.channel.send(`error: \`\`\`${error.message}\`\`\``);
            }
        };

        async function play(song) {
            const queue = ops.queue.get(message.guild.id);
            if (!song) {
                const msg = await message.channel.send('✅ **queue finished!**')
                setTimeout(() => msg.delete(), 10000)
                ops.queue.delete(message.guild.id);
                if (!queue.voiceChannel) return;
                setTimeout(() => queue.voiceChannel.leave(), 10000)
                return;
            };

            let npmin = Math.floor(song.time / 60);
            let npsec = song.time - npmin * 60
            let np = `${npmin}:${npsec}`.split(' ')

            const dispatcher = queue.connection.play(ytdl(song.url, {
                    highWaterMark: 1 << 20,
                    quality: "highestaudio"
                }))
                .on('finish', () => {
                    if (queue.loop) {
                        queue.songs.push(queue.songs.shift());
                        return play(queue.songs[0]);
                    }
                    queue.songs.shift();
                    play(queue.songs[0]);
                })
                .on('error', error => console.error(error));
            dispatcher.setVolumeLogarithmic(queue.volume / 5);
            const embed = new MessageEmbed()
                .setColor(0x0189ff)
                .setThumbnail(song.thumbnail)
                .setTimestamp()
                .addField('NOW PLAYING:', `\`\`\`fix\n${song.title}\`\`\``)
                .addField('DURATION:', `\`\`\`fix\n${np}\`\`\``)
                .setFooter(`Requested by: ${message.author.tag}`);
            queue.textChannel.send(embed);
        };
    }
}