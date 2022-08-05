const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../data/dao_linguistique');
const { EmbedBuilder } = require('discord.js');
const soundex = require('../data/soundex');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dictionnaire')
		.setDescription('cherche un mot dans le dictionnaire')
		.addSubcommand(subcommand =>
			subcommand.setName('id')
					  .setDescription("recherche un mot directement par son id")
				.addIntegerOption(option =>
					option.setName('id')
						  .setDescription("l'id du mot")
						  .setRequired(True)
					)
		)
		.addSubcommand(subcommand =>
			subcommand.setName('francais')
					  .setDescription('rechercher un mot à partir du français')
				.addStringOption(option=>
					option.setName('mot')
						.setDescription('le mot à rechercher')
						.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('offset')
						.setDescription('le combientième mot vous voulez (à utiliser si une première requête a retourné + de 5 résultats par exemple'))
		)
		.addSubcommand(subcommand =>
			subcommand.setName('pierrick')
					  .setDescription('recherche un mot à partir du pierrick')
				.addStringOption(option=>
					option.setName('mot')
						  .setDescription('le mot à rechercher')
						  .setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('offset')
						  .setDescription('le combientième mot vous voulez (à utiliser si une première requête a retourné + de 5 résultats par exemple'))
		),

	async execute(interaction) {
		const mot = interaction.options.getString('mot')
		const offset = interaction.options.getInteger('offset');
		if (interaction.options.getSubcommand() == 'francais'){
			let soundexedMot = soundex.soundex(mot);
			let list = await db.searchByFrench(soundexedMot, offset);
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
			let soundexedMot = soundex.soundex(mot);
			let list = await db.searchByPierrick(soundexedMot, offset);
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
		else if (interaction.options.getSubcommand == 'id'){
			const id = interaction.options.getInteger(id);
			const element = await db.getWord(id)
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
			await interaction.reply({embeds: [embedSearch]});
		}
	},
};
