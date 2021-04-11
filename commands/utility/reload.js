const chalk = require("chalk");
const { MessageEmbed } = require("discord.js");
const embed3 = new MessageEmbed()
    .setTitle(`you need to include the category of the command`)
    .setColor(0x0189ff)
const embed4 = new MessageEmbed()
    .setTitle(`you need to include the name of the command`)
    .setColor(0x0189ff)
module.exports = {
    name: 'reload',
    description: 'reloads <category> <command>',
    async execute(client, message, args) {
        if (!process.env.CADEN_ID.includes(message.author.id)) {
            return message.channel.send('sorry only my owner can use this command <:kek:817934784998146059>')
        } else {
            if (!args[0]) return message.channel.send(embed3);
            if (!args[1]) return message.channel.send(embed4);

            let category = args[0];
            let command = args[1].toLowerCase();
            const embed = new MessageEmbed()
                .setTitle(`${command} command was reloaded succesfully <:salute:803312330950967337>`)
                .setColor(0x0189ff)
            try {
                delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)]
                client.commands.delete(command);
                const pull = require(`../../commands/${category}/${command}.js`);
                client.commands.set(command, pull);

                console.log(chalk.yellow(`> ${command} command was reloaded`));
                return message.channel.send(embed);
            } catch (error) {
                const embed2 = new MessageEmbed()
                    .setTitle(`there was an error trying to reload ${command} <:nooo:819635999990218792>`)
                    .setDescription(`\n\`\`\`javascript\n${error.message}\n\`\`\``)
                    .setColor(0x0189ff)
                return message.channel.send(embed2);
            }
        }
    }
}