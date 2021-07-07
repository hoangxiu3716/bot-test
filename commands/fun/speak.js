const{ getAudioUrl} = require('google-tts-api');
const { connect } = require('http2');
module.exports = {
    name : 'speak',
    aliases: ['s', 'talk'],
    category : 'fun',
    run : async (client, message, args) =>{
             if(!args[0]) return message.channel.send('Đéo ghi nói gì thì tao nói cái lồn gì!');
             const string = args.join('');
             if(string.length > 50 ) return message.channel.send('Địt mẹ mày nhập dưới 50 ký tự thôi!');
             const voiceChannel = message.member.voice.channel;
             if(!voiceChannel) return message.reply('Mày phải vào room voice thì mới nghe được chứ @@');
             const audioURL  = await getAudioUrl(string,{
                 lang : 'vi',
                 slow : false,
                 host : 'https://translate.google.com',
                 timeout : 10000,
             });
             try{
                 voiceChannel.join().then(connection =>{
                     const dispatcher = connection.play(audioURL);
                     dispatcher.on('finish',() =>{
                         voiceChannel.leave();
                     });
                 }); 
             }
             catch(e){
                 message.channel.send('Bot chết');
                 console.error(e);
             };
    },
}