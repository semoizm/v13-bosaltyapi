const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Bot Hakkında Bilgi Verir.'),

  async execute(interaction, client) { 

    const semoembed = new client.discord.MessageEmbed()
      .setColor('6d6ee8')
      .setDescription('・Yapımcı <:heart:901205849404493854>  **Semoizm**\n\n**・Linkler:**\n\n[<:github:901207749675851816>](https://github.com/Semoizm)  [<:twitter:901207826729418752>](https://twitter.com/Semoizm)  [<:twitch:901207801643303012>](https://www.twitch.tv/semoizm)  [<:discord:901207777765130300>](https://discord.com/invite/4PMzNzZQu3)')
      .setFooter('Semoizm', client.user.avatarURL())
      .setTimestamp();


interaction.reply({embeds: [semoembed]})

 },
};