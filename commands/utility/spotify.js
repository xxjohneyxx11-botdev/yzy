const Discord = require("discord.js");
const convert = require("parse-ms");

module.exports = {
    name: "spotify",
    description: "spotify",
    async execute(client, message, args){
        
        const bruh = message.mentions.users.first() || message.author;
    
        let status;
        if (bruh.presence.activities.length === 1) status = bruh.presence.activities[0];
        else if (bruh.presence.activities.length > 1) status = bruh.presence.activities[1];
    
        if (bruh.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
            return message.reply("that user isn't listening to Spotify :(");
        }
    
        if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
            let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
                url = `https:/open.spotify.com/track/${status.syncID}`,
                name = status.details,
                artist = status.state,
                album = status.assets.largeText,
                timeStart = status.timestamps.start,
                timeEnd = status.timestamps.end,
                timeConvert = convert(timeEnd - timeStart);
    
            let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
            let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
            let time = `${minutes}:${seconds}`;
    
            const embed = new Discord.MessageEmbed()
            .setAuthor("Spotify", "https://i.pinimg.com/originals/1d/f4/6e/1df46e5b59ceaf54b63302e95644fd80.png")
            .setFooter(bruh.tag,  bruh.displayAvatarURL({ dynamic: true }))
            .setColor(0x0189ff)
            .setThumbnail(image)
            .addField("NAME:", `\`\`\`fix\n${name}\`\`\``, true)
            .addField("ALBUM:", `\`\`\`fix\n${album}\`\`\``, true)
            .addField("ARTIST:", `\`\`\`fix\n${artist}\`\`\``, true)
            .addField("DURATION:", `\`\`\`fix\n${time}\`\`\``, false)
            .addField("LISTEN NOW ON SPOTIFY!", `\`\`\`fix\n${artist} - ${name}\`\`\``)
            return message.channel.send(embed)
        }
        }
    }