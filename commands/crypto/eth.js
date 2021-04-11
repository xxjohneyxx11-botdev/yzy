const Discord = require("discord.js");
const axios = require('axios')

module.exports = {
    name: 'ethereum',
    aliases: ['eth'],
    description: "ethereum",
    async execute(client, message, args) {
        const response = await axios.get('https://www.zirobot.xyz/crypto/ETH');
		const data = response.data;
        const embed = new Discord.MessageEmbed()
			.setTitle('ETHERRUM PRICE')
            .addField('USD:', `\`\`\`fix\n${data.USD}$\`\`\``)
            .addField('EUR:', `\`\`\`fix\n${data.EUR}€\`\`\``)
            .addField('GBP:', `\`\`\`fix\n${data.Pound_GBP}£\`\`\``)
            .addField('BGN:', `\`\`\`fix\n${data.Bulgarian_Leva}BGN\`\`\``)
            .setThumbnail('https://cdn.discordapp.com/attachments/271256875205525504/374282740218200064/2000px-Ethereum_logo.png')
			.setColor(0x0189ff)
            .setFooter(`Provided by www.zirobot.xyz`)
		message.channel.send(embed);
        
    }
}