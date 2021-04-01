const Discord = require('discord.js');

module.exports = {
    name: "guildicon",
    description: "guildicon",
    async execute(client, message, args){
        if (message.guild.icon) {
			const embed = new Discord.MessageEmbed()
				.setDescription(`[GUILD ICON](${message.guild.iconURL({ dynamic: true, size: 1024 })})`)
				.setImage(message.guild.iconURL({ dynamic: true, size: 1024 }))
				.setColor(0x0189ff)
			message.channel.send(embed);
		} else {	
			message.channel.send('error! is there an icon?')
		}
    }
}