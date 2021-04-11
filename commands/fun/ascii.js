const Discord = require("discord.js");
const figlet = require('figlet');

const embed = new Discord.MessageEmbed()
.setTitle('**❌ INVALID USAGE**')
.setColor(0x0189ff)
.setDescription(`\`\`\`ascii <text>\`\`\``)

module.exports = {
    name: 'ascii',
    description: "ascii <text>",
    execute(client, message, args) {
        const text = args.join(" ")

        if (!args[0]) return message.channel.send(embed)
        
        figlet.text(text, {
            font: ''
        }, async(err, data) => {
            message.channel.send(`\`\`\`${data}\`\`\``)
        })
    }
}