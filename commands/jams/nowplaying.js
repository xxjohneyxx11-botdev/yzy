const {
    Util,
    MessageEmbed
} = require('discord.js');
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
    name: 'nowplaying',
    aliases: ['np', 'now-playing', 'playing'],
    description: "nowplaying",
    async execute(client, message, args, ops) {
        try {
            const { channel } = message.member.voice;
            if (!channel) return message.channel.send(erro);
            if (message.guild.me.voice.channel !== message.member.voice.channel) {
                return message.channel.send(erro);
            };
            const serverQueue = ops.queue.get(message.guild.id);
            if (!serverQueue) return message.channel.send(errorr);
            let video = serverQueue.songs[0];
            let description;
            if (video.duration == 'live stream') {
                description = 'live stream';
            } else {
                description = playbackBar(video);
            }
            const videoEmbed = new MessageEmbed()
                .setThumbnail(video.thumbnail)
                .setColor(0x0189ff)
                .setDescription(`**NOW PLAYING:**\n\`\`\`fix\n${video.title}\`\`\`\n${description}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
            message.channel.send(videoEmbed);
            return;

            function playbackBar(video) {
                const passedTimeInMS = serverQueue.connection.dispatcher.streamTime;
                const passedTimeInMSObj = {
                    seconds: Math.floor((passedTimeInMS / 1000) % 60),
                    minutes: Math.floor((passedTimeInMS / (1000 * 60)) % 60),
                    hours: Math.floor((passedTimeInMS / (1000 * 60 * 60)) % 24)
                };
                const passedTimeFormatted = formatDuration(
                    passedTimeInMSObj
                );

                const totalDurationObj = video.duration;
                const totalDurationFormatted = formatDuration(
                    totalDurationObj
                );

                let totalDurationInMS = 0;
                Object.keys(totalDurationObj).forEach(function (key) {
                    if (key == 'hours') {
                        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 3600000;
                    } else if (key == 'minutes') {
                        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 60000;
                    } else if (key == 'seconds') {
                        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 100;
                    }
                });
                const playBackBarLocation = Math.round(
                    (passedTimeInMS / totalDurationInMS) * 10
                );
                
                let playBack = '';
                for (let i = 1; i < 21; i++) {
                    if (playBackBarLocation == 0) {
                        playBack = '🔵▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
                        break;
                    } else if (playBackBarLocation == 11) {
                        playBack = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬🔵';
                        break;
                    } else if (i == playBackBarLocation * 2) {
                        playBack = playBack + '🔵';
                    } else {
                        playBack = playBack + '▬';
                    }
                }
                playBack = `${playBack}\n\n\`${passedTimeFormatted} / ${totalDurationFormatted}\``;
                return playBack
            }

            function formatDuration(durationObj) {
                const duration = `${durationObj.hours ? (durationObj.hours + ':') : ''}${
                    durationObj.minutes ? durationObj.minutes : '00'
                    }:${
                    (durationObj.seconds < 10)
                        ? ('0' + durationObj.seconds)
                        : (durationObj.seconds
                            ? durationObj.seconds
                            : '00')
                    }`;
                return duration;
            }
        } catch {
            message.channel.send(unknown)
        }
    }
}