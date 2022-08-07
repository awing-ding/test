const { SlashCommandBuilder } = require('@discordjs/builders');
const {db_linguistique} = require('../../data/dao_linguistique');
const { MessageEmbed } = require('discord.js');
const db = db_linguistique;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dictionnaire-by-regex')
		.setDescription('cherche un mot dans le dictionnaire via une regex sql')
		.addSubcommand(subcommand =>
			subcommand.setName('francais')
					  .setDescription('rechercher un mot à partir du français')
					  .addStringOption(option=>
						option.setName('regex')
							  .setDescription('la regex (format sql (opérateur like)) avec laquelle le mot sera recherchée')
							  .setRequired(true)
					)
					.addIntegerOption(option =>
						option.setName('offset')
							  .setDescription('le combientième mot vous voulez '))
		)
		.addSubcommand(subcommand =>
			subcommand.setName('pierrick')
					  .setDescription('recherche un mot à partir du pierrick')
					  .addStringOption(option=>
						option.setName('regex')
							  .setDescription('la regex (format sql (opérateur like)) avec laquelle le mot sera recherchée')
							  .setRequired(true)
					)
					.addIntegerOption(option =>
						option.setName('offset')
							  .setDescription('le combientième mot vous voulez '))
		),

	async execute(interaction) {
        const regex = interaction.options.getString('regex')
		let offset = interaction.options.getInteger('offset');
		if (offset == 'undefined') offset = 0;
		if (interaction.options.getSubcommand() == 'francais'){
			let list = await db.searchByFrench(regex, offset);
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
			let list = await db.searchByPierrick(regex, offset);
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
    }
}