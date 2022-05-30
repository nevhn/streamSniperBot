// import { SlashCommandBuilder } from '@discordjs/builders'
// import { MessageEmbed } from 'discord.js'
// import { CommandInt } from '../interfaces/CommandInt'
// import { errorHandler } from '../utils/errorHandler'
// import { captureStreamScreenshot } from './scripts/captureStreamScreenshot'
// import { checkIfFileExists, path } from './scripts/checkIfFileExists'
// import { scanImage } from './scripts/scanImage'

// export const snipe: CommandInt = {
//   data: new SlashCommandBuilder()
//     .setName('snipe')
//     .setDescription('Snipe your preferred streamer')
//     .addStringOption((option) => option.setName('input').setDescription('Enter a streamer')),
//   run: async (interaction: any) => {
//     try {
//       const streamer = interaction.option.getString('input')
//       await interaction.deferReply()

//       const streamSnipe = async () => {
//         try {
//           const twitchUrl = await fetchTwitchUrl(streamer)
//           const screenshot = await captureStreamScreenshot(twitchUrl)
//           const fileExists = await checkIfFileExists(path)
//           console.log(screenshot, fileExists)
//           if (screenshot && fileExists) {
//             console.log('✅')
//             const snipe = await scanImage(path)
//             BOT.emit('onScreenshot', snipe)
//           } else {
//             console.log('something went wrong')
//           }
//         } catch (err) {
//           console.error(err)
//         }
//       }

//       streamSnipe()
//       con
//     } catch (err) {
//       errorHandler('snipe command', err)
//     }
//   },
// }
