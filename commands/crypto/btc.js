const Discord = require("discord.js");
const axios = require('axios')

module.exports = {
    name: 'bitcoin',
    aliases: ['btc'],
    description: "bitcoin",
    async execute(client, message, args) {
        const response = await axios.get('https://www.zirobot.xyz/crypto/BTC');
		const data = response.data;
        const embed = new Discord.MessageEmbed()
			.setTitle('BITCOIN PRICE')
            .addField('USD:', `\`\`\`fix\n${data.USD}$\`\`\``)
            .addField('EUR:', `\`\`\`fix\n${data.EUR}€\`\`\``)
            .addField('GBP:', `\`\`\`fix\n${data.Pound_GBP}£\`\`\``)
            .addField('BGN:', `\`\`\`fix\n${data.Bulgarian_Leva}BGN\`\`\``)
            .setThumbnail('https://cdn.pixabay.com/photo/2013/12/08/12/12/bitcoin-225079_960_720.png')
			.setColor(0x0189ff)
            .setFooter(`Provided by www.zirobot.xyz`)
		message.channel.send(embed);
        
    }
}