import { CommandInt } from '../interfaces/CommandInt'
import { errorHandler } from '../utils/errorHandler'
import fs from 'fs-extra'
import { SlashCommandBuilder } from '@discordjs/builders'
// import { logHandler } from '../utils/logHandler'
import { generateSnipeReply } from '../scripts/generateSnipeReply'
// import Path from 'path'
import watch from '../config/watch.json'

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

      const watchOption = interaction.options.getBoolean('watch')
      const streamer = interaction.options.getString('streamer')

      // await interaction.editReply('....')

      if (watchOption || watch.flag) {
        console.log('watch flag: ', watch.flag)
        if (watchOption) {
          const watch = {
            streamer,
            flag: true,
          }

          try {
            await fs.writeJSON('./dist/config/watch.json', watch)
            console.log('modified watch config')
          } catch (err) {
            console.log(err)
          }
        }

       const interval =  setInterval(async () => {
          console.log(`watching https://twitch.tv/${streamer}`)
          const message = await generateSnipeReply(streamer)
          /**TODO:
           * figure out a condition to run clearInterval
           */
          // if (message.description != '') clearInterval(interval)

            await interaction.editReply({ embeds: [message] })
          }
        }, 8000)
        return
      }

      console.log('outside of loop', watchOption)
      const message = await generateSnipeReply(streamer)
      await interaction.editReply({ embeds: [message] })
    } catch (err) {
      errorHandler('snipe command', err)
      await interaction.editReply('Something went wrong')
      return
    }
  },
}
