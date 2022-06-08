import { Interaction } from 'discord.js'
import { CommandList } from '../commands/_CommandList'
import { errorHandler } from '../utils/errorHandler'

export const onInteraction = async (interaction: Interaction): Promise<void> => {
  try {
    if (interaction.isCommand()) {
      if (interaction.commandName === 'snipe' && interaction.options.getBoolean('watch')) {
        // interaction.emit()
        // console.log('h')
        // const cachedInteraction = interaction
        // const interval = 60000
        // setInterval(async () => {
        //   console.log('!')
        //   await CommandList[1].run(cachedInteraction)
        // }, interval)
      }
      for (const Command of CommandList) {
        if (interaction.commandName === Command.data.name) {
          await Command.run(interaction)
          // const interactionObj = interaction.options.getBoolean('watch')
          // console.log(interaction.options.)
          // console.log('interaction:', interactionObj)
          break
        }
      }
    }
  } catch (err) {
    errorHandler('onInteraction event', err)
  }
}
