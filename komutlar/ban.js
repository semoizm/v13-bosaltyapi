const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Kullanıcıyı Banla.')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('Banlanacak kullanıcı.')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
      .setDescription('Banlanma nedeni?')
      .setRequired(false)),
  async execute(interaction, client) {
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
      content: 'Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz! (`BAN_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'Engellemek istediğin kişi senden üstün!',
      ephemeral: true
    });

    if (!user.bannable) return interaction.reply({
      content: 'Engellemek istediğin kişi benim üstümde! O yüzden yasaklayamam.',
      ephemeral: true
    });

    if (interaction.options.getString('raison')) {
      user.ban({
        reason: interaction.options.getString('raison'),
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** Başarıyla yasaklandı !`
      });
    } else {
      user.ban({
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** Başarıyla yasaklandı !`
      });
    };
  },
};