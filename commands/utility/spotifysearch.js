const Discord = require("discord.js");
const bot = new Discord.Client();
const embed2 = new Discord.MessageEmbed()
.setTitle('**invalid usage**')
.setColor(0x0189ff)
.setDescription(`\`\`\`spotifysearch <song/artist>\`\`\``)
module.exports = {
    name: 'spotifysearch',
    description: "spotifysearch <song>",
    execute(client, message, args) {
        let msglink = args.join('%20')

        if(!args[0]) return message.channel.send(embed2)

        let embed = new Discord.MessageEmbed()
        .setColor(0x0189ff)
        .setDescription(`**heres your link! [click here](https://open.spotify.com/search/${msglink})**`)

        message.channel.send(embed)    
    }
}