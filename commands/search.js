const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dictionnaire')
		.setDescription('cherche un mot dans le dictionnaire')
		.addStringOption(option=>
			option.setName('mot')
				  .setDescription('le mot à rechercher')
		)
		.addSubcommand(subcommand =>
			subcommand.setName('francais')
					  .setDescription('rechercher un mot à partir du français')
		)
		.addSubcommand(subcommand =>
			subcommand.setName('pierrick')
					  .setDescription('recherche un mot à partir du pierrick')
		),
		
	async execute(interaction) {
		
	},
};
