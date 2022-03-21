const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, botId, testsw } = require('./ayarlar.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const ayarlar = require('./ayarlar.json')

for (const file of commandFiles) {
	const command = require(`./komutlar/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Yenilemeye başlandı (/) komutlar.');

		await rest.put(
			Routes.applicationGuildCommands(botId, testsw),
			{ body: commands },
		);

		console.log('Başarıyla tamamlandı (/) komutlar.');
	} catch (error) {
		console.error(error);
	}
})();