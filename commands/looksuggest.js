const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../data/dao_linguistique')
const { EmbedBuilder} = require('discord.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('looksuggest')
		.setDescription('permet à awing de valider ou non les propositions, seul awing peut faire cette commande'),
        
	async execute(interaction) {
		if (interaction.user.id == '361257883247050762'){

			let offset = 0
			const numberOfSuggestion = await db.countProposition().count;
            await interaction.user.dmChannel.send('test');
			if (numberOfSuggestion == 0) {
				await interaction.reply("il n'y a pas de suggestion pour le moment");
			}
			else {
				proposition = db.lookToProposition(offset);
				const embedProposition = new EmbedBuilder()
				.setColor(0x0011FF)
				.setAuthor({name: proposition.instigateur})
				.setTitle(proposition.francais)
				.setDescription(proposition.id)
				.addFields(
					{name: 'Pierrick', value: proposition.pierrick},
					{name: 'étymologie', value: proposition.etymologie},
					{name: 'phonetique', value: proposition.phonetique},
					{name: 'type', value: proposition.type},
					{name: '\u200b', value: '\u200B'},
					{name: 'définition', value: proposition.definition},
					{name: 'commentaire', value: 'commentaire'}
				)
				.setFooter({ text: offset + "/" + numberOfSuggestion})

				await interaction.reply({embeds: [embedProposition],});
			}
        }
        else await interaction.reply('seul awing peut faire cette commande');
	},
};
