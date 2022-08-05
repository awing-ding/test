const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../data/dao_linguistique');
const { EmbedBuilder } = require('discord.js');
const soundex = require('../data/soundex');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('resoundex')
        .setDescription('commande pour awing, permet de resoundex tout ou partie de la table')
        .addSubcommand(subcommand =>
            subcommand.setName('all')
                      .setDescription('attention risque de latence, resoundex toute la table')

        )
        .addSubcommand(subcommand =>
            subcommand.setName('byId')
                      .setDescription('ne resoundex qu\'un seul id')
                      .addIntegerOption(option=>
                        option.setName('id')
                              .setDescription('l\'id du mot à resoundex')
                        )
            )
        .addSubcommand(subcommand =>
            subcommand.setName('search')
                      .setDescription('cherche quels sont les mots sans soundex')
                      .addIntegerOption(option=>
                        option.setName('offset')
                              .setDescription('décalage quand il y a trop de mot')
                        )
            ),

    async execute(interaction) {
        if (interaction.options.getSubcommand() == 'all'){
            soundex.initSoundex();
            await interaction.reply('soundex réinitialisé');
        }
        else if (interaction.options.getSubcommand() == 'search'){
            let offset = interaction.options.getInteger('offset');
            
        }
    }
}