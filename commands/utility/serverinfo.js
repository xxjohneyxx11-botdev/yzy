const Discord = require("discord.js");
const db = require('quick.db');
const bot = new Discord.Client();

require("../../inlineReply.js")

const region = {
    'us-central': ':flag_us:  `US Central`',
    'us-east': ':flag_us:  `US East`',
    'us-south': ':flag_us:  `US South`',
    'us-west': ':flag_us:  `US West`',
    'europe': ':flag_eu:  `Europe`',
    'singapore': ':flag_sg:  `Singapore`',
    'japan': ':flag_jp:  `Japan`',
    'russia': ':flag_ru:  `Russia`',
    'hongkong': ':flag_hk:  `Hong Kong`',
    'brazil': ':flag_br:  `Brazil`',
    'sydney': ':flag_au:  `Sydney`',
    'southafrica': '`South Africa` :flag_za:'
};
const verificationLevels = {
    NONE: 'none',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'highest'
};
const notifications = {
    ALL: 'All',
    MENTIONS: 'mentions'
};

function checkBots(guild) {
    let botCount = 0;
    guild.members.cache.forEach(member => {
        if (member.user.bot) botCount++;
    });
    return botCount;
}

function checkMembers(guild) {
    let memberCount = 0;
    guild.members.cache.forEach(member => {
        if (!member.user.bot) memberCount++;
    });
    return memberCount;
}

module.exports = {
    name: 'serverinfo',
    aliases: ['si', 'guildinfo'],
    description: "serverinfo",
    execute(client, message, args) {

        let messages = db.get(`guildMessages_${message.guild.id}`)
        if (messages === null) messages = 0

        const members = message.guild.members.cache.array();
        const online = members.filter((m) => m.presence.status === 'online').length;
        const offline =  members.filter((m) => m.presence.status === 'offline').length;
        const dnd =  members.filter((m) => m.presence.status === 'dnd').length;
        const afk =  members.filter((m) => m.presence.status === 'idle').length;

        const roleCount = message.guild.roles.cache.size - 1;

        const channels = message.guild.channels.cache.array();
        const channelCount = channels.length;
        const textChannels = channels.filter(c => c.type === 'text').length;
        const voiceChannels = channels.filter(c => c.type === 'voice').length;
        
        const embed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
            .setTitle(`${message.guild.name}s info:`)
            .addField('NAME:', `\`\`\`fix\n${message.guild.name} = ${message.guild.id}\`\`\``)
            .addField('REGION:', `\`\`\`fix\n${message.guild.region}\`\`\``, inline = true)
            .addField('VERIFICATION:', `\`\`\`fix\n${message.guild.verificationLevel}\`\`\``)
            .addField('CHANNELS:', `\`\`\`fix\n${channelCount}\`\`\``, inline = true)
            .addField('VOICE:', `\`\`\`fix\n${voiceChannels}\`\`\``, inline = true)
            .addField('TEXT:', `\`\`\`fix\n${textChannels}\`\`\``, inline = true)
            .addField('ROLES:', `\`\`\`fix\n${roleCount}\`\`\``)
            .addField('MEMBERS:', `\`\`\`fix\nTOTAL: ${message.guild.memberCount}\nHUMANS: ${checkMembers(message.guild)}\nBOTS: ${checkBots(message.guild)}\`\`\``)
            .addField('STATUSES:', `\`\`\`fix\nONLINE: ${online}\nOFFLINE: ${offline}\nDND: ${dnd}\nIDLE: ${afk}\`\`\``)
            .addField('MESSAGES:', `\`\`\`fix\n${messages}\`\`\``)
            .setFooter(`Guild created at:`)
            .setTimestamp(message.guild.createdAt)
            .setColor(0x0189ff)
        
        message.inlineReply(embed)
    }
}