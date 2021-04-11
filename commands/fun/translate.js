const Discord = require('discord.js');
const translate = require('@iamtraction/google-translate');

const embed = new Discord.MessageEmbed()
.setTitle('**❌ INVALID USAGE**')
.setColor(0x0189ff)
.setDescription(`\`\`\`translate <text>\`\`\``)

module.exports = {
    name: 'translate',
    description: "translate <text>",
    async execute(client, message, args){
        const query = args.slice(0).join(' ');
        if (!args[0]) return message.channel.send(embed)

        const translated = await translate(query, { to: 'en' });
        message.channel.send(`**original:** \`${query}\`\n**translated:** \`${translated.text}\``);
    }
}