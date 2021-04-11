const Discord = require("discord.js");
const bot = new Discord.Client();
const {
    readdirSync
} = require("fs");
const {
    MessageEmbed
} = require("discord.js");
const db = require('quick.db');

require("../../inlineReply.js")

module.exports = {
    name: 'help',
    aliases: ['cmds', 'commands'],
    description: "help",
    async execute(client, message, args) {

        let prefix = db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = 'yzy '

        const links = `**[INVITE](https://discord.com/oauth2/authorize?client_id=815385417653813289&scope=bot&permissions=2097016054) | [SUPPORT](https://discord.gg/uKe9qjqchH) | [TOP.GG](https://top.gg/bot/815385417653813289) | [WEBSITE](https://www.youtube.com/watch?v=dQw4w9WgXcQ)**`

        if (!args[0]) {
            let categories = [];

            readdirSync("./commands/").forEach((dir) => {
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return

                    let name = file.name.replace(".js", "");

                    return `\`${name}\``;
                });

                let data = new Object();

                data = {
                    name: dir.toUpperCase(),
                    value: cmds.length === 0 ? "in progress." : cmds.join(", "),
                };

                categories.push(data);
            });

            const embed = new MessageEmbed()
                .setTitle("FULL COMMAND LIST:")
                .addFields(categories)
                .setDescription(
                    `use \`${prefix}help\` followed by a command name to get more additional information on a command. for example: \`${prefix}help ban\`.`
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .addField('LINKS', `${links}`)
                .setTimestamp()
                .setColor(0x0189ff);
            return message.inlineReply(embed);
        } else {
            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`**invalid command! use** \`${prefix}help\` **for all of my commands!**`)
                    .setColor(0x0189ff);
                return message.inlineReply(embed);
            }

            const embed = new MessageEmbed()
                .setTitle("COMMAND DETAILS:")
                .addField(
                    "COMMAND NAME:",
                    command.name ? `\`\`\`fix\n${command.name}\`\`\`` :
                    "```fix\nno name for this command.```"
                )
                .addField(
                    "ALIASES:",
                    command.aliases ?
                    `\`\`\`fix\n${command.aliases.join(", ")}\`\`\`` :
                    "```fix\nno aliases for this command.```"
                )
                .addField(
                    "USAGE:",
                    `\`\`\`fix\n${prefix}${command.description}\`\`\`` ?
                    `\`\`\`fix\n${prefix}${command.description}\`\`\`` :
                    "```fix\nno usage for this command.```"
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(0x0189ff);
            return message.inlineReply(embed);
        }
    }
}