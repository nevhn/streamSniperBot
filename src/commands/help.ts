import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'
import { errorHandler } from '../utils/errorHandler'

export const help: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Provides information on using this bot.'),
  run: async (interaction: any) => {
    try {
      await interaction.deferReply()
      const helpEmbed = new MessageEmbed()
      helpEmbed.setTitle('FckingStreamSnipers')
      helpEmbed.setDescription(
        'This discord bot can check if a streamer is queueing up for a game [currently works for Apex Legends only]',
      )
      helpEmbed.addField(
        'watch a streamer with the watch flag',
        'Use the `/snipe` command with the `watch` option set to `true`, this will allow the bot to take screenshot continuously(can be used multiple times but has not been tested thoroughly).',
      )
      helpEmbed.addField('stop watching', 'Use the `/stop` command to disable the `watch` flag')
      helpEmbed.addField('ping', 'Get bot latency ')
      helpEmbed.setFooter(`Version ${process.env.npm_package_version}`)
      await interaction.editReply({ embeds: [helpEmbed] })
      return
    } catch (err) {
      errorHandler('help command', err)
    }
  },
}
