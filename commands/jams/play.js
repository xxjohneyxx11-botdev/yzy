const { Util, MessageEmbed } = require('discord.js');
const GOOGLE_API_KEY = 'AIzaSyAx9nkSt2wid8_5JclJUuaC7Gh3AEcFF7M'
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require('ytdl-core');

const embed1 = new Discord.MessageEmbed()
.setTitle('**invalid usage**')
.setColor(0x0189ff)
.setDescription(`\`\`\`play <song/url>\`\`\``)

module.exports = {
    name: 'play',
    aliases: ['p'],
    description: "play <song/url>",
    async execute(client, message, args) {

        const queue2 = new Map();
        const queue3 = new Map();
        const queue = new Map();
        const games = new Map()

        const ops = {
            queue: queue,
            queue2: queue2,
            queue3: queue3,
            games: games
        }

        if (!args[0]) return message.channel.send(embed1)
        args = message.content.split(' ');
        const searchString = args.slice(1).join(' ');
        const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';

        const {
            channel
        } = message.member.voice;
        if (!channel) return message.channel.send('you need to be in a voice channel!');

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        if (!permissions.has('SPEAK')) return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');

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
                    return message.channel.send('no video found')
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
                url: `https://www.youtube.com/watch?v=${video.id}`,
                thumbnail: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
                duration: video.duration,
                time: songInfo.videoDetails.lengthSeconds
            };

            if (serverQueue) {
                serverQueue.songs.push(song);
                if (playlist) return undefined;
                else {
                    const sembed = new MessageEmbed()
                        .setColor(0x0189ff)
                        .setTitle("song added to queue")
                        .setThumbnail(song.thumbnail)
                        .setTimestamp()
                        .setDescription(`\`${song.title}\` has been added to queue! | Requested By \`${message.author.tag}\``)
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
                volume: 2,
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
                return message.channel.send(`I could not join the voice channel: ${error.message}`);
            }
        };
        async function play(song) {
            const queue = ops.queue.get(message.guild.id);
            if (!song) {
                setTimeout(() => queue.voiceChannel.leave(), 4000)
                ops.queue.delete(message.guild.id);
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