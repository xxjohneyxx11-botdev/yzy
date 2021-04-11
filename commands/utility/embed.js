const Discord = require('discord.js');


module.exports = {
    name: "embed",
    description: "embed <title> <COLOR> <message>",
    async execute(client, message, args){
        let title = args[0];
        let color = args[1]
        let msg = args.splice(2).join(' '); 
        let errorembed =  new Discord.MessageEmbed()
        .setTitle('**invalid usage**')
        .setColor(0x0189ff)
        .setDescription(`\`\`\`embed <title> <COLOR> <message>\`\`\``)

        if(!args[0]) return message.channel.send(errorembed)
        if(!args[1]) return message.channel.send(errorembed)

        let embed = new Discord.MessageEmbed() 
            .setTitle(title) 
            .setColor(color)
            .setDescription(msg)
            .setFooter(message.author.tag)
            .setTimestamp()
        message.delete()
        message.channel.send(embed)
    }
}