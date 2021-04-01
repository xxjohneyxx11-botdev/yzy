const Discord = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
    name: 'translate',
    description: "translate <text>",
    async execute(client, message, args){
        const query = args.slice(0).join(' ');
        if (!args[0]) return message.channel.send('please give me text to translate!')

        const translated = await translate(query, { to: 'en' });
        message.channel.send(`original: \`${query}\`\ntranslated: \`${translated.text}\``);
    }
}