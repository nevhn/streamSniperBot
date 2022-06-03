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
import {
  checkMarkButton,
  crossMark,
  exampleEmbed,
  sleepingFace,
  warning,
} from './snipeEmbedMessages/inLobby'

export const snipe: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription('Snipe your preferred streamer')
    .addStringOption((option) =>
      option.setName('streamer').setDescription('Enter a str3amer').setRequired(true),
    ) as SlashCommandBuilder,
  run: async (interaction: any) => {
    try {
      await interaction.deferReply()
      const streamer: string = interaction.options.getString('streamer')
      const twitchUrl = await fetchTwitchUrl(streamer)
      console.log('twitchUrl:', twitchUrl)
      if (twitchUrl === null) {
        // await interaction.editReply(`${streamer} does not exist`)
        exampleEmbed.title = `${streamer} does not exist`
        exampleEmbed.thumbnail.url = warning
        await interaction.editReply({ embeds: [exampleEmbed] })
        return
      }
      if (twitchUrl === false) {
        // await interaction.editReply(`${streamer} is currently offline`)
        exampleEmbed.title = `${streamer} is currently offline`
        exampleEmbed.thumbnail.url = sleepingFace
        exampleEmbed.url = `https://twitch.tv/${streamer}`
        await interaction.editReply({ embeds: [exampleEmbed] })
        return
      }
      const screenshot = await captureStreamScreenshot(twitchUrl as string)
      const fileExists = await checkIfFileExists(path)
      // console.log(`screenshot: ${screenshot}, fileExists: ${fileExists}`)
      exampleEmbed.title = streamer
      exampleEmbed.url = twitchUrl as string
      if (screenshot && fileExists) {
        const imgurUrl = await uploadScreenshot(path)
        const snipe = await scanImage(path)
        console.log(snipe)
        console.log(imgurUrl)
        exampleEmbed.image.url = imgurUrl
        if (snipe) {
          exampleEmbed.color = 0x00005aff
          exampleEmbed.description = 'In Lobby'
          exampleEmbed.thumbnail.url = checkMarkButton
          // await interaction.editReply('In lobby')
          await interaction.editReply({ embeds: [exampleEmbed] })
          return
        }
        // await interaction.editReply('In game or something..')
        exampleEmbed.description = 'In a game or something...'
        exampleEmbed.thumbnail.url = crossMark
        await interaction.editReply({ embeds: [exampleEmbed] })
        return
      }
    } catch (err) {
      errorHandler('snipe command', err)
    }
  },
}
