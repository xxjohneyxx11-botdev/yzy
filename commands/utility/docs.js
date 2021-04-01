const Discord = require('discord.js');
const fetch = require('node-fetch');
const embed = new Discord.MessageEmbed()
    .setTitle('query not found!')
    .setColor(0x0189ff)
const embed1 = new Discord.MessageEmbed()
    .setTitle('couldnt fetch the docs!')
    .setColor(0x0189ff)
const embed2 = new Discord.MessageEmbed()
    .setTitle('please include a search query!')
    .setColor(0x0189ff)
const embed3 = new Discord.MessageEmbed()
    .setTitle('**invalid usage**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`docs <something>\`\`\``)
module.exports = {
    name: 'docs',
    aliases: ['djs'],
    description: 'docs <text>',
    async execute(client, message, args) {

        let [query, branch] = args; 

        if(!args[0]) return message.channel.send(embed3)

        if(!query) return message.channel.send(embed2)
        if(!branch) branch = "master";

        fetch(`https://djsdocs.sorta.moe/v2/embed?src=${branch}&q=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(json => {
                if (!json) return message.channel.send(embed)

                message.channel.send({ embed: json})

            }).catch(() => {
                message.channel.send(embed1)
            })
               
    }
}