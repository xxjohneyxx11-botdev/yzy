const Discord = require("discord.js");
const axios = require('axios')

module.exports = {
    name: 'ripple',
    aliases: ['xrp'],
    description: "ripple",
    async execute(client, message, args) {
        const response = await axios.get('https://www.zirobot.xyz/crypto/XRP');
		const data = response.data;
        const embed = new Discord.MessageEmbed()
			.setTitle('RIPPLE PRICE')
            .addField('USD:', `\`\`\`fix\n${data.USD}$\`\`\``)
            .addField('EUR:', `\`\`\`fix\n${data.EUR}€\`\`\``)
            .addField('GBP:', `\`\`\`fix\n${data.Pound_GBP}£\`\`\``)
            .addField('BGN:', `\`\`\`fix\n${data.Bulgarian_Leva}BGN\`\`\``)
            .setThumbnail('https://cdn.discordapp.com/attachments/800688178221940736/803609476581031956/all_0009_Layer-1.png')
			.setColor(0x0189ff)
            .setFooter(`Provided by www.zirobot.xyz`)
		message.channel.send(embed);
        
    }
}