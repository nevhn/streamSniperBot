console.clear()
import { onReady } from './events/onReady'
import { IntentOptions } from './config/IntentOptions'
import { onInteraction } from './events/onInteraction'
import 'dotenv/config'
import { Client } from 'discord.js'
import { watchConfig } from './scripts/generateWatch'
;(async () => {
  await watchConfig() // create watch config
  const BOT = new Client({ intents: IntentOptions })
  BOT.on('ready', async () => await onReady(BOT))
  BOT.on('interactionCreate', async (interaction) => await onInteraction(interaction))

  await BOT.login(process.env.DISCORD_TOKEN as string)
})()
