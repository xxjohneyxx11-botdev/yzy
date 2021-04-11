const Discord = require("discord.js");
const db = require('quick.db');
const moment = require('moment');
const permissions = require('../../permissions.json');

require("../../inlineReply.js")

const flagss = {
    DISCORD_EMPLOYEE: `Discord Employee`,
    DISCORD_PARTNER: `Partnered Server Owner`,
    BUGHUNTER_LEVEL_1: `Bug Hunter (Level 1)`,
    BUGHUNTER_LEVEL_2: `Bug Hunter (Level 2)`,
    HYPESQUAD_EVENTS: `HypeSquad Events`,
    HOUSE_BRAVERY: `House of Bravery`,
    HOUSE_BRILLIANCE: `House of Brilliance`,
    HOUSE_BALANCE: `House of Balance`,
    EARLY_SUPPORTER: `Early Supporter`,
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: `Verified Bot`,
    VERIFIED_DEVELOPER: `Early Verified Bot Developer`
};

const statuses = {
    online: `online`,
    idle: `idle`,
    offline: `offline`,
    dnd: `dnd`
};

const flags = {
    DISCORD_EMPLOYEE: `discord employee`,
    DISCORD_PARTNER: `verified discord partner`,
    VERIFIED_DEVELOPER: `verified bot developer`,
    EARLY_SUPPORTER: `early supporter`,
    BUGHUNTER_LEVEL_1: `bug hunter lvl 1`,
    HOUSE_BRAVERY: `house of bravery`,
    HOUSE_BRILLIANCE: `house of brilliance`,
    HOUSE_BALANCE: `house of balance`,
    TEAM_USER: 'team User',
    SYSTEM: 'system ',
    BUGHUNTER_LEVEL_2: `bug hunter lvl 2`,

}

module.exports = {
    name: 'userinfo',
    aliases: ['whois', 'ui'],
    description: "userinfo",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || message.author;
        const member =  message.mentions.members.first() || message.author;

        let activities = [];
        if (activities === null) activities.push('none')
        let customStatus = [];
        if (activities === null) activities.push('none')

        var acknowledgements = 'none';

        if (user.id == message.guild.ownerID) {
            acknowledgements = 'server owner';
        }
        if (user.id == '742853857104887820') {
            acknowledgements = 'bot developer';
        }
        if (user.bot) {
            acknowledgements = 'discord bot';
        }
        /*
        if(user.user.hasPermission('ADMINISTRATOR')){
            acknowledgements = 'server admin';
        }
        */
        /*
        const permissions = message.guild.permissionsFor(user);
        if (permissions.has('ADMINISTRATOR')) {
            acknowledgements = 'server admin';
        }
        

        const memberPermissions = member.permissions.toArray();
      const finalPermissions = [];
      for (const permission in permissions) {
        if (memberPermissions.includes(permission)) finalPermissions.push(`+ ${permissions[permission]}`);
        else finalPermissions.push(`- ${permissions[permission]}`);
      }
        */
        for (const activity of user.presence.activities.values()) {
            switch (activity.type) {
                case 'PLAYING':
                    activities.push(`playing ${activity.name}`);
                    break;
                case 'LISTENING':
                    if (user.bot) activities.push(`Listening to ${activity.name}`);
                    else activities.push(`listening to ${activity.details} by ${activity.state}`);
                    break;
                case 'WATCHING':
                    activities.push(`watching ${activity.name}`);
                    break;
                case 'STREAMING':
                    activities.push(`streaming ${activity.name}`);
                    break;
                case 'CUSTOM_STATUS':
                    customStatus = activity.state;
                    break;
            }
        }

        const embed = new Discord.MessageEmbed()
            .setThumbnail(user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
            .setTitle(`${user.username}s info:`)
            .addField('NAME:', `\`\`\`fix\n${user.username}\`\`\``)
            .addField('TAG:', `\`\`\`fix\n#${user.discriminator}\`\`\``)
            .addField('ID:', `\`\`\`fix\n${user.id}\`\`\``)
            .addField('JOINED AT:', `\`\`\`fix\n${moment(user.joinedAt).format('MMM DD YYYY')}\`\`\``, inline = true)
            .addField('CREATED AT:', `\`\`\`fix\n${moment(user.createdAt).format('MMM DD YYYY')}\`\`\``, inline = true)
            .addField('STATUS:', `\`\`\`fix\nPRESENCE: ${statuses[user.presence.status]}\nCUSTOM STATUS: ${customStatus}\nACTIVITIES: ${activities}\`\`\``)
            //.addField('MESSAGES:', `\`\`\`fix\n${db.get(`messages_${user.id}_${message.guild.id}`)}\`\`\``)
            //.addField('FLAGS:', `\`\`\`fix\n${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'none'}\`\`\``)
            .addField('ACKNOWLEDGEMENTS:', `\`\`\`fix\n${acknowledgements}\`\`\``)
            //.addField('PERMISSIONS:', `\`\`\`fix\n${finalPermissions.join('\n')}\`\`\``)
            .setTimestamp()
            .setColor(0x0189ff)
        message.inlineReply(embed)
    }
}