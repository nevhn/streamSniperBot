import { Interaction } from 'discord.js'
import { CommandList } from '../commands/_CommandList'
import { errorHandler } from '../utils/errorHandler'
// import watch from '../config/watch.json'
// import { streamSnipe } from '../scripts/streamSnipe'

export const onInteraction = async (interaction: Interaction): Promise<void> => {
  try {
    if (interaction.isCommand()) {
      // if (interaction.commandName === 'snipe' && watch.flag) {
      //   console.log('**')
      //   const streamer: string = watch.streamer
      //   setInterval(async () => {
      //     await interaction.deferReply()
      //     console.log('!streamer: ', streamer)
      //     const snipe = await streamSnipe(streamer)
      //     if (snipe?.twitchUrl === undefined) {
      //       await interaction.reply(`${streamer} does not exist`)
      //     }

      //     if (snipe?.twitchUrl === false) {
      //       await interaction.reply(`${streamer} is offline`)
      //     }
      //     if (snipe?.inQueue) {
      //       await interaction.reply('in lobby!')
      //       return
      //     }

      //     await interaction.reply('in game or something')
      //     return
      //   }, 5000)
      // }
      for (const Command of CommandList) {
        if (interaction.commandName === Command.data.name) {
          await Command.run(interaction)
          break
        }
      }
    }
  } catch (err) {
    errorHandler('onInteraction event', err)
  }
}
