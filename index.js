const{ Client ,MessageEmbed,Collection} = require('discord.js');
const client = new Client();
const { token } = require('./config.json');
client.on("ready",() =>{
    console.log(`${client.user.username} da san sang hoat dong`);
    client.user.setPresence({
        activity:{
            name : "alo alo",
            type : 'PLAYING'
        },
        status : 'online'
    })
})
client.commands = new Collection();
client.aliases = new Collection();
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.on("message", message=>{
    if(message.author.bot) return;
    const prefix = ','
    if(message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client,message,args);

  /*  switch(cmd){
 
    }
    case 'avatar' : {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        const URL =  member.user.avatarURL({format : 'jpg',dynamic : true,size : 1024})
        const avatarEmbed = new MessageEmbed().setImage(URL).setURL(URL).setTitle('Dowload Here')
        message.channel.send(avatarEmbed)
    }
}
*/
})
client.login(token);