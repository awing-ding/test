const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../../data/dao_linguistique');
const { MessageEmbed } = require('discord.js');
const soundex = require('../../data/soundex');

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
						  .setRequired(true)
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
						.setDescription('le combientième mot vous voulez'))
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
						  .setDescription('le combientième mot vous voulez '))
		),

	async execute(interaction) {
		const mot = interaction.options.getString('mot')
		let offset = interaction.options.getInteger('offset');
		if (offset == 'undefined') offset = 0;
		if (interaction.options.getSubcommand() == 'francais'){
			let soundexedMot = soundex.soundex(mot);
			let list = await db.searchByFrench(soundexedMot, offset);
			let i = 0;
			for (const element of list) {
				const embedSearch = new MessageEmbed()
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
			console.log('pierrick presoundex');
			if (offset == 'undefined' || offset == null) offset = 0;
			let soundexedMot = soundex.soundex(mot);
			console.log('pierrick predb')
			let list = await db.searchByPierrick(soundexedMot, offset);
			let i = 0;
			console.log('pierrick preparser')
			await interaction.deferReply();
			for (const element of list) {
				console.log('loop prébuild');
				const embedSearch = new MessageEmbed()
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
				console.log(i);
				if (i == 0){
					await interaction.editReply({embeds: [embedSearch]});
				}
				else {
					await interaction.followUp({embeds: [embedSearch]});
				}
				i++;
			}
		}
		else if (interaction.options.getSubcommand == 'id'){
			await interaction.deferReply();
			const id = interaction.options.getInteger(id);
			console.log('predb');
			const element = await db.getWord(id)
			console.log('pre embed')
			const embedSearch = new MessageEmbed()
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
			
			await interaction.editReply({embeds: [embedSearch]});
		}
	},
};
