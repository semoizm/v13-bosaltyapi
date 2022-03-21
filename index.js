const fs = require('fs');
const {
  Client,
  Collection,
  Intents
} = require('discord.js');
const config = require('./ayarlar.json');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

const Discord = require('discord.js');
client.discord = Discord;
client.config = config;

let ayarlar = require('./ayarlar.json')

client.commands = new Collection();
const commandFiles = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./komutlar/${file}`);
  client.commands.set(command.data.name, command);
};


client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client, config);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true
    });
  };
});

client.on('ready', () => {
  client.user.setActivity({ name: ayarlar.oynuyor, type: "WATCHING" })
  console.log('[LOG] Bot Aktif!')
 })

client.login(ayarlar.token);

//yeni komutlar alt kısma//