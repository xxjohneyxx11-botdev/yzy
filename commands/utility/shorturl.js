const Discord = require("discord.js");
const TinyURL = require('tinyurl');

module.exports = {
    name: 'shorturl',
    aliases: ['shorten'],
    description: "shorturl <url>",
    execute(client, message, args) {
        const mes = args.join(" ")

        if (!args[0]) return message.channel.send('please provide a url to shorten!')

        TinyURL.shorten(`${mes}`, function (res, err) {
            if (err)
                console.log(err)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**[HERE IS YOUR NEW URL!](${res})**`)
                    .setColor(0x0189ff)
                message.channel.send(embed);
        })
    }
}