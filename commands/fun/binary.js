const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'binary',
    description: "binary <encode/decode> <text>",
    async execute(client, message, args){
        if (!args[0]) return message.channel.send('please specify if you want to encode or decode!')

        //const query = args.shift().toLowerCase()
        let word = args.slice(1).join(' ');

        if (args[0] === 'encode') {
            if (!word) return message.channel.send('please give me text to encode!')

            const { data } = await axios.get(`https://some-random-api.ml/binary?text=${encodeURIComponent(word)}`)

            message.channel.send(data.binary ?? 'an error occured', { code: '', })
        } else if (args[0] === 'decode') {
            if (!word) return message.channel.send('please give me binary to decode!')

            const { data } = await axios.get(`https://some-random-api.ml/binary?decode=${encodeURIComponent(word)}`)

            message.channel.send(data.text ?? 'an error occured', { code: '', })
        } else {
            return message.channel.send(`plase chose to \`encode\` or \`decode\`!`)
        }
    }
}