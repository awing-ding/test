const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../data/dao_linguistique');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dictionnaireByRegex')
		.setDescription('cherche un mot dans le dictionnaire via une regex sql')
		.addStringOption(option=>
			option.setName('regex')
				  .setDescription('la regex (format sql (opérateur like)) avec laquelle le mot sera recherchée')
				  .setRequired(true)
		)
		.addIntegerOption(option =>
			option.setName('offset')
				  .setDescription('le combientième mot vous voulez (à utiliser si une première requête a retourné + de 5 résultats par exemple'))
		.addSubcommand(subcommand =>
			subcommand.setName('francais')
					  .setDescription('rechercher un mot à partir du français')
		)
		.addSubcommand(subcommand =>
			subcommand.setName('pierrick')
					  .setDescription('recherche un mot à partir du pierrick')
		),

	async execute(interaction) {
        const regex = interaction.options.getString('regex')
		const offset = interaction.options.getInteger('offset');
		if (interaction.options.getSubcommand() == 'francais'){
			let list = await db.searchByFrench(regex, offset);
			let i = 0;
			for (const element of list) {
				const embedSearch = new EmbedBuilder()
					.setColor(0x0000FF)
					.setTitle(element.francais)
					.setDescription(element.pierrick)
					.addFields(
						{name: 'cyrilique', value: element.cyrilic},
						{name: 'hangeul', value: element.hangeul},
						{name: 'étymologie', value: element.etymologie},
						{name: 'phonetique', value: element.phonetique},
						{name: 'type', value: element.type},
						{name: '\u200b', value: '\u200B'},
						{name: 'classe grammaticale', value: element.class},
						{name: 'définition', value: element.definition},
						{name: 'commentaire', value: element.commentaire}
					)
				if (i == 0){
					await interaction.reply({embeds: [embedSearch]});
				}
				else {
					await interaction.followUp({embeds: [embedSearch]});
				}
				i++;
			}
		}
		else if (interaction.options.getSubcommand() == 'pierrick'){
			let list = await db.searchByPierrick(regex, offset);
			let i = 0;
			for (const element of list) {
				const embedSearch = new EmbedBuilder()
					.setColor(0x0000FF)
					.setTitle(element.francais)
					.setDescription(element.pierrick)
					.addFields(
						{name: 'cyrilique', value: element.cyrilic},
						{name: 'hangeul', value: element.hangeul},
						{name: 'étymologie', value: element.etymologie},
						{name: 'phonetique', value: element.phonetique},
						{name: 'type', value: element.type},
						{name: '\u200b', value: '\u200B'},
						{name: 'classe grammaticale', value: element.class},
						{name: 'définition', value: element.definition},
						{name: 'commentaire', value: element.commentaire}
					)
				if (i == 0){
					await interaction.reply({embeds: [embedSearch]});
				}
				else {
					await interaction.followUp({embeds: [embedSearch]});
				}
				i++;
			}
		}
    }
}