const Discord = require('discord.js');

const embeds = new Discord.MessageEmbed()
.setTitle('**invalid usage**')
.setColor(0x0189ff)
.setDescription(`\`\`\`codeblock <syntax> <code>\`\`\``)

module.exports = {
    name: 'codeblock',
    description: "codeblock <syntax> <code>",
    execute(client, message, args) {
        let syntax = args[0]
        if(!syntax) syntax = 'text'
        const code = args.slice(1).join(' ');

        if(!args[0]) return message.channel.send(embeds)

        if(!code) return message.channel.send(embeds)
        
        const embed = new Discord.MessageEmbed()
        .setDescription(`\`\`\`${syntax}\n${code}\`\`\``)
        .setFooter(`from: ${message.author.tag} | syntax: ${syntax}`)
        .setTimestamp()
        .setColor(0x0189ff)
        message.channel.send(embed)
        message.delete()
    }
}