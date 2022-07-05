import { CommandInt } from '../interfaces/CommandInt'
import { errorHandler } from '../utils/errorHandler'
import { SlashCommandBuilder } from '@discordjs/builders'
import { IntentOptions } from '../config/IntentOptions'
import { logHandler } from '../utils/logHandler'
import { Client } from 'discord.js'
export const ping: CommandInt = {
  data: new SlashCommandBuilder().setName('ping').setDescription('check latency'),
  run: async (interaction: any) => {
    try {
      const BOT = new Client({ intents: IntentOptions })
      await interaction.reply(
        `🏓Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(
          BOT.ws.ping,
        )}ms`,
      )
      logHandler.log('info', '🔔ping command was used')
      return
    } catch (err) {
      errorHandler('help command', err)
    }
  },
}
