import { CommandInt } from '../interfaces/CommandInt'
import { errorHandler } from '../utils/errorHandler'
import { logHandler } from '../utils/logHandler'
import { generateSnipeReply } from '../scripts/generateSnipeReply'
import { watchConfig } from '../scripts/generateWatch'
import { apexPlayerChoices } from '../config/apexPlayers'
import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageAttachment } from 'discord.js'
import fs from 'fs-extra'

export const snipe: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription('grab a screenshot from stream')
    .addStringOption(
      (option) =>
        option
          .setName('streamer')
          .setDescription('Enter a streamer')
          .setRequired(true)
          .addChoices(...apexPlayerChoices),
      //TODO: make a database or store array somewhere
    )
    .addBooleanOption((option) =>
      option
        .setName('watch')
        .setDescription(
          'constantly grabs a screenshot from stream until user uses "/stop" or streamer goes offline',
        ),
    ) as SlashCommandBuilder,
  run: async (interaction: any) => {
    try {
      await interaction.deferReply()
      logHandler.log('info', '🔔snipe command was used')
      const file = new MessageAttachment('./dist/scripts/screenshot/twitch.png')
      const watchOption = interaction.options.getBoolean('watch')
      const streamer = interaction.options.getString('streamer')
      logHandler.log('info', `🎯 sniping ${streamer}...`)

      // if (watchOption) await watchConfig(streamer, true)

      if (watchOption) {
        await watchConfig(streamer, true)
        while (true) {
          //TODO:"refactor this"
          const isWatchFlag = await fs.readJson('./dist/config/watch.json') // reads the recently modified watch.json
          const newMessage = await generateSnipeReply(streamer)
          if (!isWatchFlag.flag) {
            logHandler.log('info', `🔴no longer watching ${streamer}`)
            break
          }
          if (!newMessage?.online) {
            // if streamer suddenly goes offline
            logHandler.log(`info`, `${streamer} is currently offline`)
            await interaction.followUp({ embeds: [newMessage] })
            break
          }
          await interaction.followUp({
            embeds: [newMessage],
            files: newMessage.online ? [file] : [],
          })
          logHandler.log('info', `👁watching ${streamer}...`)
        }
        return
      }

      const message = await generateSnipeReply(streamer)
      // if (!message?.online) return // exit if streamer <is offline | does not exist>
      await interaction.followUp({ embeds: [message], files: message.online ? [file] : [] })
      return
    } catch (err) {
      errorHandler('snipe command', err)
      await interaction.editReply('Something went wrong')
      return
    }
  },
}
