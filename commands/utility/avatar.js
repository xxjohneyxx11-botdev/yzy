const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = {
    name: 'avatar',
    aliases: ['av'],
    description: "avatar <@user>",
    execute(client, message, args) {
        let mentionedUser = message.mentions.users.first() || message.author;
        const avatarembed = new Discord.MessageEmbed()
            .setTitle(`${mentionedUser.username}s avatar:`)
            .setDescription(`[AVATAR LINK](${mentionedUser.displayAvatarURL({ dynamic: true, size: 1024 })})`)
            .setImage(mentionedUser.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor(0x0189ff)
        message.channel.send(avatarembed)
        
    }
}