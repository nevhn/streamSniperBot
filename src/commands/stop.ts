import { CommandInt } from '../interfaces/CommandInt'
import { errorHandler } from '../utils/errorHandler'
import { SlashCommandBuilder } from '@discordjs/builders'
import { watchConfig } from '../scripts/generateWatch'
import { logHandler } from '../utils/logHandler'
import fs from 'fs-extra'
export const stop: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Disables watch flag... takes a few seconds ⌛ '),
  run: async (interaction: any) => {
    try {
      const watch = await fs.readJson('./dist/config/watch.json') // reads the recently modified watch.json
      if (!watch.streamer) {
        await interaction.reply('not watching any streamers at the moment...')
        return
      }
      await watchConfig()
      await interaction.reply(`no longer watching ${watch.streamer}`)
      logHandler.log('info', '🔔stop command was used...')
      return
    } catch (err) {
      errorHandler('help command', err)
    }
  },
}
