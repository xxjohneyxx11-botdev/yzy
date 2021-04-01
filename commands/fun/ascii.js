const Discord = require("discord.js");
const figlet = require('figlet');

module.exports = {
    name: 'ascii',
    description: "ascii <text>",
    execute(client, message, args) {
        const text = args.join(" ")
        
        figlet.text(text, {
            font: ''
        }, async(err, data) => {
            message.channel.send(`\`\`\`${data}\`\`\``)
        })
    }
}