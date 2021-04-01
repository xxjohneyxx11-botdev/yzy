const Discord = require('discord.js');
const db = require('quick.db');
const embed1 = new Discord.MessageEmbed()
    .setTitle('**invalid usage**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`mute <@user> <reason>\`\`\``)
const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `MANAGE_ROLES` permission')
    .setColor(0x0189ff)
const embedd = new Discord.MessageEmbed()
    .setTitle('i am missing the `MANAGE_ROLES` permission')
    .setColor(0x0189ff)
const embeddd = new Discord.MessageEmbed()
    .setTitle('i am missing the `MANAGE_ROLES` permission')
    .setColor(0x0189ff)
module.exports = {
    name: 'mute',
    description: "mute <@user> <reason>",
    async execute(client, message, args) {
        /*
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(embedd)
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(embed3)

        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send(embed1)

        if (member.id === message.author.id) return message.channel.send('you cant mute yourself dumb dumb')

		let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
		if (!muteRole) {
			try {
				muteRole = await message.guild.roles.create({
					data: {
						name: 'Muted',
						color: '#514f48',
						permissions: ['READ_MESSAGE_HISTORY'],
					},
				});
			} catch (err) {
				message.channel.send('there was an error trying to make muted role!')
			}

            try {
                member.roles.add(muteRole).then(async () => {
                    message.channel.send('user muted!')
                });
            } catch (err) {
                message.channel.send('error giving role')
            }
		}
        */
       message.channel.send('not working rn LMAO')
    }
}