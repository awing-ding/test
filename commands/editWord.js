const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../data/dao_linguistique')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('editword')
		.setDescription('permet à awing de modifier les mots, seul awing peut faire cette commande')
        .addStringOption(option =>
            option.setName('id')
                  .setDescription("l'id du mot")
                  .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('pierrick')
                  .setDescription('Le mot en pierrick')
            )
        .addStringOption( option =>
            option.setName('definition')
                  .setDescription('la définition de votre mot')
            )
        .addStringOption( option =>
            option.setName('etymologie')
                  .setDescription('d\'où provient votre mot')
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
            option.setName('commentaire')
                  .setDescription("un commentaire supplémentaire (optionnel)")
            )
        .addStringOption(option=>
            option.setName('cyrilic')
                  .setDescription('le mot dans l\'alphabet cyrilique')
            )
        .addStringOption( option =>
            option.setName('hangeul')
                  .setDescription('l\'écriture de votre mot en hangeul')
            )
        .addStringOption(option =>
            option.setName('class')
                  .setDescription("la classe gramaticale du mot")
        ),

        
	async execute(interaction) {
		if (interaction.user.id == '361257883247050762'){
            const id = interaction.options.getString('id');
            if (db.isIdValid(id)) {
                //obtention des paramètres et ajout dans un objet
                let param = {}
                param.pierrick = interaction.options.getString('pierrick');
                param.définition = interaction.options.getString('definition');
                param.étymologie = interaction.options.getString('etymologie');
                param.francais = interaction.options.getString('francais');
                param.phonétique = interaction.options.getString('phonetique');
                param.commentaire = interaction.options.getString('commentaire');
                param.cyrilic = interaction.options.getString('cyrilic');
                param.hangeul = interaction.options.getString('hangeul');
                param.classe = interaction.options.getString('class');
                let qvalues = ""
                //on récupère les valeurs pour vérifier si quelque chose a été mit ou non, puis on les transcrit dans un format valide sql
                for (proprieties of param){
                    if(param[proprieties] != undefined){
                        qvalues = qcolumn + ` ${proprieties} = ${param[proprieties]},`
                    }
                }
                if (qvalues.endsWith(',')){
                    qvalues = qvalues.substring(0, qvalues.length -1 );
                }
                else await interaction.reply('aucune modification à faire !');


            }
            else await interaction.reply("l'id est invalide")

        }
        else await interaction.reply('seul awing peut faire cette commande');
	},
};