import { Interaction } from 'discord.js'
import { CommandList } from '../commands/_CommandList'
import { errorHandler } from '../utils/errorHandler'
import watch from '../config/watch.json'
// import fs from 'fs/promises'

export const onInteraction = async (interaction: Interaction): Promise<void> => {
  // let watch
  try {
    if (interaction.isCommand()) {
      if (interaction.commandName === 'snipe' && watch.flag) {
        const streamer: string = watch.streamer
        setInterval(async () => {
          console.log('streamer: ', streamer)
          await CommandList[1].run(interaction, streamer)
          return
        }, 5000)
      }
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
