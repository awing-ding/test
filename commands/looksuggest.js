const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../data/dao_linguistique')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('looksuggest')
		.setDescription('permet à awing de valider ou non les propositions, seul awing peut faire cette commande')
		.addIntegerOption( option=>
			option.setName('offset')
				  .setDescription("permet de définir quel proposition on souhaite")
		),
        
	async execute(interaction) {
		if (interaction.user.id == '361257883247050762'){
			const numberOfSuggestion = await db.countProposition().count;
            await interaction.user.dmChannel.send('test');
			if (numberOfSuggestion == 0) {
				await interaction.reply("il n'y a pas de suggestion pour le moment");
			}
			else {
				proposition = db.lookToProposition();
			}
        }
        else await interaction.reply('seul awing peut faire cette commande');
	},
};
