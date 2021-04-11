const Discord = require("discord.js");
const axios = require('axios')

module.exports = {
    name: 'quote',
    aliases: ['yequote'],
    description: "quote",
    async execute(client, message, args) {
        const response = await axios.get('https://api.kanye.rest/');
		const data = response.data;
        const embed = new Discord.MessageEmbed()
			.setDescription(`**RANDOM KANYE QUOTE:**\n\`\`\`fix\n"${data.quote}"\`\`\``)
			.setColor(0x0189ff)
            .setFooter(`Requested by: ${message.author.username}`)
            .setTimestamp()
		message.channel.send(embed);
    }
}