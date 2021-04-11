const Discord = require("discord.js");
const axios = require('axios')

module.exports = {
    name: 'bitcoincash',
    aliases: ['bhc'],
    description: "bitcoincash",
    async execute(client, message, args) {
        const response = await axios.get('https://www.zirobot.xyz/crypto/BHC');
		const data = response.data;
        const embed = new Discord.MessageEmbed()
			.setTitle('BITCOINCASH PRICE')
            .addField('USD:', `\`\`\`fix\n${data.USD}$\`\`\``)
            .addField('EUR:', `\`\`\`fix\n${data.EUR}€\`\`\``)
            .addField('GBP:', `\`\`\`fix\n${data.Pound_GBP}£\`\`\``)
            .addField('BGN:', `\`\`\`fix\n${data.Bulgarian_Leva}BGN\`\`\``)
            .setThumbnail('https://cdn.discordapp.com/attachments/800688178221940736/803609465714376734/all_0006_Layer-7.png')
			.setColor(0x0189ff)
            .setFooter(`Provided by www.zirobot.xyz`)
		message.channel.send(embed);
        
    }
}