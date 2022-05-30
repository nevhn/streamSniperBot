import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInt } from '../interfaces/CommandInt'
import { errorHandler } from '../utils/errorHandler'
import { fetchTwitchUrl } from '../scripts/fetchTwitchUrl'
import { captureStreamScreenshot } from '../scripts/captureStreamScreenshot'
import { checkIfFileExists, path } from '../scripts/checkIfFileExists'
import { scanImage } from '../scripts/scanImage'

export const snipe: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription('Snipe your preferred streamer')
    .addStringOption((option) =>
      option.setName('input').setDescription('Enter a str3amer').setRequired(true),
    ) as SlashCommandBuilder,
  run: async (interaction: any) => {
    try {
      const streamer = interaction.option.getString('input')
      await interaction.deferReply()
      const twitchUrl = await fetchTwitchUrl(streamer)
      if (twitchUrl === undefined) {
        await interaction.reply(`${streamer} does not exist`)
      }
      if (twitchUrl === false) {
        await interaction.reply(`${streamer} is currently offline`)
      }

      const screenshot = await captureStreamScreenshot(twitchUrl as string)
      const fileExists = await checkIfFileExists(path)
      console.log(screenshot, fileExists)

      if (screenshot && fileExists) {
        // console.log('✅')
        const snipe = await scanImage(path)
        if (snipe) {
          await interaction.reply('In lobby')
        }
      } else {
        await interaction.reply('In game or something..')
      }
      await interaction.editReply({})
    } catch (err) {
      errorHandler('snipe command', err)
    }
  },
}
