import { CommandInt } from '../interfaces/CommandInt'
import { errorHandler } from '../utils/errorHandler'
import { SlashCommandBuilder } from '@discordjs/builders'
import { logHandler } from '../utils/logHandler'
import { generateSnipeReply } from '../scripts/generateSnipeReply'
import { watchConfig } from '../scripts/generateWatch'
import fs from 'fs-extra'

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
      /**TODO:
       * refactor this
       */
      await interaction.deferReply()

      logHandler.log('info', 'snipe command was used')
      const watchOption = interaction.options.getBoolean('watch')
      const streamer = interaction.options.getString('streamer')
      const message = await generateSnipeReply(streamer)
      await interaction.followUp({ embeds: [message] })

      if (!message?.online) return // exit if streamer <is offline | does not exist>

      if (watchOption) {
        await watchConfig(streamer, true)
        while (true) {
          logHandler.log(`info`, `watching ${streamer}`)
          const isWatchFlag = await fs.readJson('./dist/config/watch.json') // reads the recently modified watch.json
          if (!isWatchFlag.flag) {
            logHandler.log('info', `${streamer} watch flag set to ${false}`)
            break
          }
          const newMessage = await generateSnipeReply(streamer)
          if (!newMessage?.online) {
            // if streamer suddenly goes offline
            logHandler.log(`info`, `${streamer} went offline`)
            await interaction.followUp({ embeds: [newMessage] })
            break
          }
          await interaction.followUp({ embeds: [newMessage] })
        }
      }
      return
    } catch (err) {
      errorHandler('snipe command', err)
      await interaction.editReply('Something went wrong')
      return
    }
  },
}
