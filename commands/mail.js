const request = require('request');
const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args, ops) => {
    var password = args[1];
    if(!args[0]) return message.reply("Insert the username you want to use");
    if(!args[1]) {
        password = Math.random().toString(36).slice(-8);
    }
    var url = "https://pddimp.yandex.ru/api2/admin/email/add";
    var pddtoken = "QW6Y3OFLLAISUSVUP5JYOIXOF4XMY5S7JHQ5RXLKFR5NYBIE4XHA";
    var domain = "postephil.cf";
    request(url, {
        headers: {
            "PddToken": pddtoken,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: `domain=${domain}&login=${args[0]}&password=${password}`,
    }, function(err, response, req, body) {
        if(err) {
            console.log(err);
            return message.reply("Can't create mail at the moment, try again later...");
        }
        var mailparse = JSON.parse(response.body);
        message.channel.messages.fetch({ limit: 1 }).then(messages => {
            message.channel.bulkDelete(messages)
        });
        if(mailparse.success == "ok") {
            message.reply("I'm sending you a private message with the new mailbox informations");
            const mailEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('New mailbox informations')
            .setURL(`http://mail.${mailparse.domain}`)
            .setDescription(`WARNING: You shouldn't use this mail for normal use, but for privacy use, you've been warned`)
            .addField("Website URL", `http://mail.${mailparse.domain}`)
            .addField("Login", `${mailparse.login}`)
            .addField("Password", `${password}`)
            .setFooter("Powered by Yandex", "https://alternativebk.com/wp-content/uploads/2020/02/5e434e2ed746d.png");
            message.author.send(mailEmbed);
        }
        if(mailparse.success == "error") {
            var replyError = "An error occured, try to contact the bot administrator to resolve this bug";
            if(mailparse.error == "passwd-tooshort") replyError = "Password is too short!";
            if(mailparse.error == "occupied") replyError = "Username is not available";
            message.reply(replyError);
        }
    });
}
