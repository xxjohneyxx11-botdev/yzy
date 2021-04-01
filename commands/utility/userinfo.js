const Discord = require("discord.js");
const db = require('quick.db');
const moment = require('moment');

require("../../inlineReply.js")

const flags = {
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

const permissions = {
	"ADMINISTRATOR": "Administrator",
	"VIEW_AUDIT_LOG": "View Audit Log",
	"VIEW_GUILD_INSIGHTS": "View Server Insights",
	"MANAGE_GUILD": "Manage Server",
	"MANAGE_ROLES": "Manage Roles",
	"MANAGE_CHANNELS": "Manage Channels",
	"KICK_MEMBERS": "Kick Members",
	"BAN_MEMBERS": "Ban Members",
	"CREATE_INSTANT_INVITE": "Create Invite",
	"CHANGE_NICKNAME": "Change Nickname",
	"MANAGE_NICKNAMES": "Manage Nicknames",
	"MANAGE_EMOJIS": "Manage Emojis",
	"MANAGE_WEBHOOKS": "Manage Webhooks",
	"VIEW_CHANNEL": "Read Text Channels & See Voice Channels",
	"SEND_MESSAGES": "Send Messages",
	"SEND_TTS_MESSAGES": "Send TTS Messages",
	"MANAGE_MESSAGES": "Manage Messages",
	"EMBED_LINKS": "Embed Links",
	"ATTACH_FILES": "Attach Files",
	"READ_MESSAGE_HISTORY": "Read Message History",
	"MENTION_EVERYONE": "Mention @everyone, @here, and All Roles",
	"USE_EXTERNAL_EMOJIS": "Use External Emojis",
	"ADD_REACTIONS": "Add Reactions",
	"CONNECT": "Connect",
	"SPEAK": "Speak",
	"STREAM": "Video",
	"MUTE_MEMBERS": "Mute Members",
	"DEAFEN_MEMBERS": "Deafen Members",
	"MOVE_MEMBERS": "Move Members",
	"USE_VAD": "Use Voice Activity",
	"PRIORITY_SPEAKER": "Priority Speaker"
}

module.exports = {
    name: 'userinfo',
    aliases: ['whois', 'ui'],
    description: "userinfo",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || message.author;
        
        let activities = [];
        if (activities === null) activities.push('none')
        let customStatus = [];
        if (activities === null) activities.push('none')

        var acknowledgements = 'none';
        
        if(user.id == message.guild.ownerID){
            acknowledgements = 'server owner';
        }
        if(user.id == '742853857104887820'){
            acknowledgements = 'bot developer';
        }
        if (user.bot){
            acknowledgements = 'discord bot';
        }
        /*
        if(user.user.hasPermission('ADMINISTRATOR')){
            acknowledgements = 'server admin';
        }
        */

        /*
        const memberPermissions = user.permissions;
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
            .setThumbnail(user.displayAvatarURL({dynamic: true, size: 1024}))
            .setTitle(`${user.username}s info:`)
            .addField('NAME:', `\`\`\`fix\n${user.username}\`\`\``)
            .addField('TAG:', `\`\`\`fix\n#${user.discriminator}\`\`\``)
            .addField('ID:', `\`\`\`fix\n${user.id}\`\`\``)
            .addField('JOINED AT:', `\`\`\`fix\n${moment(user.joinedAt).format('MMM DD YYYY')}\`\`\``, inline = true)
            .addField('CREATED AT:', `\`\`\`fix\n${moment(user.createdAt).format('MMM DD YYYY')}\`\`\``, inline = true)
            .addField('STATUS:', `\`\`\`fix\nPRESENCE: ${statuses[user.presence.status]}\nCUSTOM STATUS: ${customStatus}\nACTIVITIES: ${activities}\`\`\``)
            //.addField('MESSAGES:', `\`\`\`fix\n${db.get(`messages_${user.id}_${message.guild.id}`)}\`\`\``)
            .addField('ACKNOWLEDGEMENTS:', `\`\`\`fix\n${acknowledgements}\`\`\``)
            .setFooter(`Requested by ${message.author.username}`)
            .setTimestamp()
            .setColor(0x0189ff)
        message.inlineReply(embed)
    }
}