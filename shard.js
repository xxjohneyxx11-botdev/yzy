/*
const Discord = require('discord.js');

const shards = new Discord.ShardingManager('./main.js', {
    token: process.env.DISCORD_TOKEN,
    totalShards: auto
});


shards.on('shardCreate', shard => {
    console.log(`> [${new Date().toString().split(" ", 5).join(" ")}] launched shard #${shard.id}`) 
});

shards.spawn(shards.totalShards, 10000);
*/