const Discord = require("discord.js");
const axios = require('axios')

module.exports = {
    name: 'person',
    aliases: ['randperson, randomperson'],
    description: "person",
    async execute(client, message, args) {
        const response = await axios.get('https://person-generator.com/api/person');
		const data = response.data;
        const embed = new Discord.MessageEmbed()
				.setDescription(`**Name:** ${data.name}
				**Gender:** ${data.gender}
				**Age:** ${data.age} years
				**DOB:** ${data.dob}
				**Height:** ${data.height} in
				**Job:** ${data.profession}
				**Company:** ${data.company}
                ***THESE PEOPLE ARE RANDOMLY GENERATED***`)
				.setColor(0x0189ff)
                .setFooter(`Requested by: ${message.author.username}`)
                .setTimestamp()
			message.channel.send(embed);
    }
}