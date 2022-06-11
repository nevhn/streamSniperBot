import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInt } from '../interfaces/CommandInt'
import { errorHandler } from '../utils/errorHandler'
import { inLobbyEmbed } from './snipeEmbedMessages/inLobby'
import { notInLobbyEmbed } from './snipeEmbedMessages/notInLobby'
import { doesNotExistEmbed } from './snipeEmbedMessages/doesNotExist'
import { offlineEmbed } from './snipeEmbedMessages/offline'
import { streamSnipe } from '../scripts/streamSnipe'

export const snipe: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription('Snipe your preferred streamer')
    .addStringOption((option) =>
      option.setName('streamer').setDescription('Enter a streamer').setRequired(true),
    )
    .addBooleanOption((option) =>
      option.setName('watch').setDescription('enable constant updates on streamer'),
    ) as SlashCommandBuilder,
  run: async (interaction: any) => {
    try {
      await interaction.deferReply()
      const streamer: string = interaction.options.getString('streamer')
      const watch = interaction.options.getBoolean('watch')
      console.log('watch flag: ', watch)
      const snipe = await streamSnipe(streamer, watch as boolean)
      // console.log(snipe?.twitchUrl)
      // console.log('twitchUrl:', twitchUrl)
      if (snipe?.twitchUrl === undefined) {
        console.log(`${streamer} does not exist`)
        doesNotExistEmbed.title = streamer
        await interaction.editReply({ embeds: [doesNotExistEmbed] })
        return
      }
      if (snipe.twitchUrl === false) {
        offlineEmbed.title = streamer
        console.log(`${streamer} is currently offline`)
        offlineEmbed.url = `https://twitch.tv/${streamer}`
        await interaction.editReply({ embeds: [offlineEmbed] })
        return
      }

      await interaction.editReply(`Sniping ${streamer} 🎯 🔫 ...`)
      if (snipe.inQueue) {
        inLobbyEmbed.title = streamer
        inLobbyEmbed.url = snipe.twitchUrl as string
        inLobbyEmbed.image.url = snipe.imgurUrl as string
        await interaction.editReply({ embeds: [inLobbyEmbed] })
        return
      }
      notInLobbyEmbed.title = streamer
      notInLobbyEmbed.url = snipe.twitchUrl as string
      notInLobbyEmbed.image.url = snipe.imgurUrl as string
      await interaction.editReply({ embeds: [notInLobbyEmbed] })
      return
    } catch (err) {
      errorHandler('snipe command', err)
      await interaction.editReply('Something went wrong')
    }
  },
}
