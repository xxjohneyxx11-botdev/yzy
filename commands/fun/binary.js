const Discord = require('discord.js');
const axios = require('axios');

const embed = new Discord.MessageEmbed()
.setTitle('**❌ INVALID USAGE**')
.setColor(0x0189ff)
.setDescription(`\`\`\`binary <encode/decode> <text>\`\`\``)

module.exports = {
    name: 'binary',
    description: "binary <encode/decode> <text>",
    async execute(client, message, args){
        if (!args[0]) return message.channel.send(embed)

        //const query = args.shift().toLowerCase()
        let word = args.slice(1).join(' ');

        if (args[0] === 'encode') {
            if (!word) return message.channel.send(embed)

            const { data } = await axios.get(`https://some-random-api.ml/binary?text=${encodeURIComponent(word)}`)

            message.channel.send(data.binary, { code: '', })
        } else if (args[0] === 'decode') {
            if (!word) return message.channel.send(embed)

            const { data } = await axios.get(`https://some-random-api.ml/binary?decode=${encodeURIComponent(word)}`)

            message.channel.send(data.text, { code: '', })
        } else {
            return message.channel.send(embed)
        }
    }
}