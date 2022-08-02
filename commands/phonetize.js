const { SlashCommandBuilder } = require('@discordjs/builders');
import * as correspondance from "../data/phonetique.json";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('phonetize')
		.setDescription('donne la correspondance en alphabet phonetique d\'un mot en pierrick')
        .addStringOption(option =>
            option
                .setName('mot')
                .setDescription('le mot que vous souhaitez phonétiser (vous pouvez mettre plusieurs mot séparés par des virgules)')
                .setRequired(true)    
        ),
        
	async execute(interaction) {
		let mot = interaction.options.getString('mot');
        let phonetique = "/";
        for (const iterator of mot) {
            phonetique = phonetique + correspondance[iterator];
        }
        phonetique += "/";
        await interaction.reply(phonetique);
	},
};
