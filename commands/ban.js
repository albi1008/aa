exports.run = (client, message, args, ops) => {
	if(message.channel.type == 'DM') return message.reply('puoi usare questo comando solo nei server!');
	var user = message.mentions.users.first();
	const banReason = args.slice(1).join(' ');
	if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply("You haven't the permission to execute this command!");
	if(!user) {
		try {
			if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error(' nessun utente trovato!');
			user = message.guild.members.get(args.slice(0, 1).join(' '));
			user = user.user;
		} catch (error) {
			return message.reply('Couldn\'t get a Discord user with this userID!');
		}
	}
	if (user === message.author) return message.channel.send('non puoi bannarti da solo!');
	if (!banReason) return message.reply('inserisci una ragione per il ban!');
	message.guild.members.ban(user, { reason: banReason });
	const Discord = require('discord.js');
	const banConfirm = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`✅ ${user.tag} è stato bannato!\nRagione: __${banReason}__`);
	message.channel.send(banConfirm);
}