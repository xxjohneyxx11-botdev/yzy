const Discord = require("discord.js");
const db = require('quick.db');

const errorr = new Discord.MessageEmbed()
    .setTitle('**❌ ERROR**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`insignificant funds\`\`\``)

const embed2 = new Discord.MessageEmbed()
    .setTitle('**❌ INVALID USAGE**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`store (item)\`\`\``)

module.exports = {
    name: 'store',
    description: "store <item>",
    execute(client, message, args) {

        let money = db.get(`money_${message.author.id}`)
        if (money === null) money = 0

        let prefix = db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = 'yzy '

        //if (!lol.includes(args[0])) return message.reply(`do \`${prefix}store <buy> <item>\` to buy an item!`)

        const embed = new Discord.MessageEmbed()
            .setTitle(`YEEZY SUPPLY`)
            .setDescription(`you have \`${money}\` 💵\n do \`${prefix}store (item)\` to buy an item`)
            .addField('YEEZY SLIDES (slides)', `\`10,000\` 💵`, inline = true)
            .addField('YEEZY 350 (250)', `\`25,000\` 💵`, inline = true)
            .addField('YEEZY 380 (380)', `\`45,000\` 💵`, inline = true)
            .addField('FOAM RNNR (rnnr)', `\`70,000\` 💵`, inline = true)
            .addField('YEEZY 500 (500)', `\`150,000\` 💵`, inline = true)
            .addField('YEEZY QNTM (qntm)', `\`200,000\` 💵`, inline = true)
            .addField('YEEZY 450 (450)', `\`250,000\` 💵`, inline = true)
            .addField('YEEZY 700 (700)', `\`300,000\` 💵`, inline = true)
            .addField('COMBAT BOOTS (boots)', `\`10,000,000\` 💵`, inline = true)
            .setFooter(`Requested by: ${message.author.username}`)
            .setTimestamp()
            .setColor(0x0189ff)

        if (!args[0]) return message.channel.send(embed)

        if (args[1]) return message.reply('when buying an item take out the first word of the item shown in the shop')

        const item = args[0]

        let items = 'YEEZY SLIDES'

        if (item === 'slides') {

            if (10000 > money) return message.reply(errorr)

            db.subtract(`money_${message.author.id}`, 10000)

            db.push(`inventory_${message.author.id}`, ' YEEZY SLIDES')

        } else if (item === '350') {

            if (25000 > money) return message.reply(errorr)

            db.subtract(`money_${message.author.id}`, 25000)

            db.push(`inventory_${message.author.id}`, ' YEEZY 350')

            items = 'YEEZY 350'

        } else if (item === '380') {

            if (45000 > money) return message.reply(errorr)

            db.subtract(`money_${message.author.id}`, 45000)

            db.push(`inventory_${message.author.id}`, ' YEEZY 380')

            items = 'YEEZY 380'

        } else if (item === 'rnnr') {

            if (70000 > money) return message.reply(errorr)

            db.subtract(`money_${message.author.id}`, 70000)

            db.push(`inventory_${message.author.id}`, ' YEEZY RNNR')

            items = 'YEEZY RNNR'

        } else if (item === '500') {

            if (150000 > money) return message.reply(errorr)

            db.subtract(`money_${message.author.id}`, 150000)

            db.push(`inventory_${message.author.id}`, ' YEEZY 500')

            items = 'YEEZY 500'

        } else if (item === 'qntm') {

            if (200000 > money) return message.reply(errorr)

            db.subtract(`money_${message.author.id}`, 200000)

            db.push(`inventory_${message.author.id}`, ' YEEZY QNTM')

            items = 'YEEZY QNTM'

        } else if (item === '450') {

            if (250000 > money) return message.reply(errorr)

            db.subtract(`money_${message.author.id}`, 250000)

            db.push(`inventory_${message.author.id}`, ' YEEZY 450')

            items = 'YEEZY 450'

        } else if (item === '700') {

            if (300000 > money) return message.reply(errorr)

            db.subtract(`money_${message.author.id}`, 300000)

            db.push(`inventory_${message.author.id}`, ' YEEZY 700')

            items = 'YEEZY 700'

        } else if (item === 'boots') {
            if (10000000 > money) return message.reply(errorr)

            db.subtract(`money_${message.author.id}`, 10000000)

            db.push(`inventory_${message.author.id}`, ' COMBAT BOOTS')

            items = 'COMBAT BOOTS'

        } else {
            return message.reply(embed2)
        }

        const bought = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag}`)
            .setDescription(`added **${items}** to your inventory!`)
            .setTimestamp()
            .setColor(0x0189ff)

        message.channel.send(bought)

    }
}