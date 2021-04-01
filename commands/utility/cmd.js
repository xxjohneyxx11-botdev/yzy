const Discord = require("discord.js");
const child = require('child_process');

require("../../inlineReply.js")

module.exports = {
    name: 'cmd',
    description: "cmd <code>",
    async execute(client, message, args) {
        if (message.author.id == '742853857104887820') {

            let command = args.join(" ")
            if (!command) return message.channel.send(`missing arguments: \`<code>\``)

            child.exec(command, (err, res) => {
                const embed2 = new Discord.MessageEmbed()
                    .setTitle(`error while executing`)
                    .setDescription(`\n\`\`\`javascript\n${err.message}\n\`\`\``)
                    .setColor(0x0189ff)
                if (err) return message.channel.send(embed2);
                message.channel.send(res.slice(0, 2000), {
                    code: "js"
                });
            })


        } else {
            return message.channel.send('sorry only my owner can use this command <:kek:817934784998146059>')
        }

    }
}