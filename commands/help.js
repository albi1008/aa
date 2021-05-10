const prefix = process.env.PREFIX;
const Discord = require('discord.js');

exports.run = (client, message, args, ops) => {
  helpMsg = new Discord.MessageEmbed()
  .setTitle(client.user.username)
  .setDescription("Grazie per aver usato **" + client.user.username)
  .addField("🔊 Musica", "`play`, `leave`, `pause`, `resume`, `search`, `skip`, `musiclink`, `volume`")
  .addField("👮‍ Moderazione", "`clear` (or `purge`), `ban`, `kick`, `nick`, `mute`, `unmute`, `whois`, `destroy`")
  .addField("🚀 Utility", "`Covid19`")
  .setColor('RANDOM')
  message.channel.send(helpMsg);
}
