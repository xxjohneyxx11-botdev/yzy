const Discord = require("discord.js");
const axios = require('axios')

module.exports = {
    name: 'polkadot',
    aliases: ['dot'],
    description: "polkadot",
    async execute(client, message, args) {
        const response = await axios.get('https://www.zirobot.xyz/crypto/DOT');
		const data = response.data;
        const embed = new Discord.MessageEmbed()
			.setTitle('POLKADOT PRICE')
            .addField('USD:', `\`\`\`fix\n${data.USD}$\`\`\``)
            .addField('EUR:', `\`\`\`fix\n${data.EUR}€\`\`\``)
            .addField('GBP:', `\`\`\`fix\n${data.Pound_GBP}£\`\`\``)
            .addField('BGN:', `\`\`\`fix\n${data.Bulgarian_Leva}BGN\`\`\``)
            .setThumbnail('https://cdn.discordapp.com/attachments/800688178221940736/803609520424091678/all_0016_Layer-21.png')
			.setColor(0x0189ff)
            .setFooter(`Provided by www.zirobot.xyz`)
		message.channel.send(embed);
        
    }
}