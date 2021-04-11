const Discord = require("discord.js");
const bot = new Discord.Client();
const embed = new Discord.MessageEmbed()
    .setTitle('please dont try and make me ping!')
    .setColor(0x0189ff)
const embed2 = new Discord.MessageEmbed()
.setTitle('**❌ INVALID USAGE**')
.setColor(0x0189ff)
.setDescription(`\`\`\`say <text>\`\`\``)
module.exports = {
    name: 'say',
    cooldown: 2,
    description: "say <text>",
    execute(client, message, args) {
        const saywhat = args.join(" ")
        if (message.content.includes("@everyone") || message.content.includes("@here")) return message.channel.send(embed);
        if(saywhat < 1) return message.channel.send(embed2)
        message.channel.send(saywhat)
        message.delete()        
    }
}