const Discord = require("discord.js");
const sourcebin = require('sourcebin');
const {
    inspect
} = require("util")

require("../../inlineReply.js")

module.exports = {
    name: 'eval',
    description: "eval <code>",
    async execute(client, message, args) {
        if (message.author.id == '742853857104887820') {
            try {
                let toEval = args.join(" ")
                    let evaluated = inspect(eval(toEval, {
                        depth: 0
                    }));

                    if (!toEval) {
                        return message.channel.send(`error while evaluating: \`air\``);
                    } else {
                        let hrStart = process.hrtime()
                        let hrDiff;
                        hrDiff = process.hrtime(hrStart);

                        if (evaluated.length > 2000) await sourcebin.create(
                            [{
                                content: `${evaluated}`,
                                language: 'text',
                            }, ], {
                                title: 'evaluated code',
                                description: `<3`,
                            }
                        ).then(async (src) => {
                            const embed = new Discord.MessageEmbed()
                                .setTitle('output is too long!')
                                .setDescription(`**so heres a **[link](${src.url})** for it**`)
                                .setTimestamp()
                                .setColor(0x0189ff)
                            return message.channel.send(embed)
                        })

                        return message.channel.send(`\n\`\`\`javascript\n${evaluated}\n\`\`\``, {
                            maxLength: 1900
                        })
                    }
                

            } catch (e) {
                return message.channel.send(`error while evaluating: \`${e.message}\``);
            }

        } else {
            return message.channel.send('sorry only my owner can use this command <:kek:817934784998146059>')
        }

    }
}