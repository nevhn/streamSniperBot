import { CommandInt } from '../interfaces/CommandInt'
import { errorHandler } from '../utils/errorHandler'
import { logHandler } from '../utils/logHandler'
import { generateSnipeReply } from '../scripts/generateSnipeReply'
import { watchConfig } from '../scripts/generateWatch'
import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageAttachment } from 'discord.js'
import fs from 'fs-extra'

export const snipe: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription('Snipe your preferred streamer')
    .addStringOption((option) =>
      option
        .setName('streamer')
        .setDescription('Enter a streamer')
        .setRequired(true)
        // addChoices(...choices)
        .addChoices({ name: 'tsm_imperialhal', value: 'tsm_imperialhal' })
        .addChoices({ name: 'doesNotExist111', value: 'doesNotExist111' })
        .addChoices({ name: 'xQc', value: 'xqc' })
        .addChoices({ name: 'reps', value: 'tsm_reps' })
        .addChoices({ name: 'dropped', value: 'dropped' })
        .addChoices({ name: 'hollow_o', value: 'hollow_o' })
        .addChoices({ name: 'crylixblooom', value: 'crylixblooom' })
        .addChoices({ name: 'vinnie', value: 'vinnie' })
        .addChoices({ name: 'akagosu', value: 'akagosu' })
        .addChoices({ name: 'sweetdreams', value: 'sweetdreams' })
        .addChoices({ name: 'acie', value: 'acie' })
        .addChoices({ name: 'noko', value: 'noko' }),
    )
    .addBooleanOption((option) =>
      option.setName('watch').setDescription('enable constant updates on streamer'),
    ) as SlashCommandBuilder,
  run: async (interaction: any) => {
    try {
      const file = new MessageAttachment('./dist/scripts/screenshot/twitch.png')
      /**TODO:
       * refactor this
       */
      await interaction.deferReply()

      logHandler.log('info', '🔔snipe command was used')
      const watchOption = interaction.options.getBoolean('watch')
      const streamer = interaction.options.getString('streamer')
      const message = await generateSnipeReply(streamer)
      await interaction.followUp({ embeds: [message], files: message.online ? [file] : [] })

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
          await interaction.followUp({
            embeds: [newMessage],
            files: newMessage.online ? [file] : [],
          })
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
