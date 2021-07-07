module.exports = {
    name : 'say',
    category : 'fun',
    aliases : 's',
    run : (client, message, args) =>{
        if(message.deletable) message.delete()
        message.channel.send(args.join(' '));
    }
}