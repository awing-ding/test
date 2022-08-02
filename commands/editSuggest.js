const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../data/dao_linguistique')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('editsuggest')
		.setDescription('permet à awing de modifier les propositions, seul awing peut faire cette commande')
        .addStringOption(option =>
            option.setName('pierrick')
                  .setDescription('Le mot en pierrick')
                  .setRequired(true)
            )
        .addStringOption( option =>
            option.setName('definition')
                  .setDescription('la définition de votre mot')
                  .setRequired(true)
            )
        .addStringOption( option =>
            option.setName('etymologie')
                  .setDescription('d\'où provient votre mot')
                  .setRequired(true)
            )
        .addStringOption( option =>
            option.setName('francais')
                  .setDescription('la traduction francaise du mot (optionnel)')
            )
        .addStringOption( option =>
            option.setName('phonetique')
                  .setDescription("l'écriture de votre mot en alphabet phonétique international")
            )
        .addStringOption( option =>
            option.setName('class')
                  .setDescription('la classe gramaticale du mot')
            )
        .addStringOption(option=>
            option.setName('cyrilic')
                  .setDescription('le mot dans l\'alphabet cyrilique')
            )
        .addStringOption( option =>
            option.setName('hangeul')
                  .setDescription('l\'écriture de votre mot en hangeul')
            )
        .addStringOption( option =>
            option.setName('commentaire')
                  .setDescription("un commentaire supplémentaire (optionnel)")
            ),
	async execute(interaction) {
		if (interaction.user.id == '361257883247050762'){


        }
        else await interaction.reply('seul awing peut faire cette commande');
	},
};
