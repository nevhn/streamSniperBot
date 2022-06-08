import { SlashCommandBuilder } from '@discordjs/builders'
// import { MessageEmbed } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'
import { errorHandler } from '../utils/errorHandler'
import { fetchTwitchUrl } from '../scripts/fetchTwitchUrl'
// import { logHandler } from '../utils/logHandler'
import { captureStreamScreenshot } from '../scripts/captureStreamScreenshot'
import { checkIfFileExists, path } from '../scripts/checkIfFileExists'
import { scanImage } from '../scripts/scanImage'
import { uploadScreenshot } from '../scripts/upload'
import { inLobbyEmbed } from './snipeEmbedMessages/inLobby'
import { notInLobbyEmbed } from './snipeEmbedMessages/notInLobby'
import { doesNotExistEmbed } from './snipeEmbedMessages/doesNotExist'
import { offlineEmbed } from './snipeEmbedMessages/offline'

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
      const watch: Boolean = interaction.options.getBoolean('watch')
      console.log('watch flag: ', watch)
      const twitchUrl = await fetchTwitchUrl(streamer)
      // console.log('twitchUrl:', twitchUrl)
      if (twitchUrl === null) {
        console.log(`${streamer} does not exist`)
        doesNotExistEmbed.title = streamer
        await interaction.editReply({ embeds: [doesNotExistEmbed] })
        return
      }
      if (twitchUrl === false) {
        offlineEmbed.title = streamer
        console.log(`${streamer} is currently offline`)
        offlineEmbed.url = `https://twitch.tv/${streamer}`
        await interaction.editReply({ embeds: [offlineEmbed] })
        return
      }

      const screenshot = await captureStreamScreenshot(twitchUrl as string)
      const fileExists = await checkIfFileExists(path)
      // console.log(`screenshot: ${screenshot}, fileExists: ${fileExists}`)
      if (screenshot && fileExists) {
        await interaction.editReply(`Sniping ${streamer} 🎯 🔫 ...`)
        const imgurUrl = await uploadScreenshot(path)
        const snipe = await scanImage(path)
        console.log(snipe)
        console.log(imgurUrl)
        if (snipe) {
          inLobbyEmbed.title = streamer
          inLobbyEmbed.url = twitchUrl as string
          inLobbyEmbed.image.url = imgurUrl as string
          await interaction.editReply({ embeds: [inLobbyEmbed] })
          return
        }
        notInLobbyEmbed.title = streamer
        notInLobbyEmbed.url = twitchUrl as string
        notInLobbyEmbed.image.url = imgurUrl as string
        await interaction.editReply({ embeds: [notInLobbyEmbed] })
        return
      }
    } catch (err) {
      errorHandler('snipe command', err)
    }
  },
}
