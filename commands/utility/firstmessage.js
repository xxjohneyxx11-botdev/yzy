const Discord = require('discord.js');

module.exports = {
    name: "firstmessage",
    description: "firstmessage",
    async execute(client, message, args){
            const messages = await message.channel.messages.fetch({ after: 1, limit: 1 });
			const fMessage = messages.first();
			const embed = new Discord.MessageEmbed()
                .setColor(0x0189ff)
				.setAuthor(fMessage.author.tag, fMessage.author.displayAvatarURL({ format: 'png', dynamic: true }))
				.setDescription(`**[MESSAGE LINK](${fMessage.url})**`)
				.addField('MESSAGE CONTENT:', `\`\`\`fix\n${fMessage.content}\`\`\``)
				.setTimestamp(fMessage.createdAt)
				.setFooter(`ID: ${fMessage.id}`)
			message.channel.send(embed);
    }
}