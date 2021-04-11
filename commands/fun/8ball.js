const Discord = require("discord.js");

const response = [
    "It is certain",
    "It is decidedly so",
    "without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, Yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Dont count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

const embed = new Discord.MessageEmbed()
    .setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`8ball <question>\`\`\``)

module.exports = {
    name: '8ball',
    description: '8ball <question>',
    execute(client, message, args) {
        if (!args[0]) return message.channel.send(embed)

        const b = args.slice(0).join(' ');
        const answer = response[Math.floor(Math.random() * response.length)]

        message.channel.send(`**question:** \`${b}\`\n**answer:** \`${answer}\``)         
    }
}