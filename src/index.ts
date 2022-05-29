import { Client } from 'discord.js'
import 'dotenv/config'
import { onReady } from './events/onReady'
import { IntentOptions } from './config/IntentOptions'
import { onInteraction } from './events/onInteraction'
import { OnScreenshot } from './events/OnScreenshot'
;(async () => {
  const BOT = new Client({ intents: IntentOptions })

  BOT.on('ready', async () => await onReady(BOT))
  BOT.on('interactionCreate', async (interaction) => await onInteraction(interaction))
  BOT.on('onScreenshot', async () => await OnScreenshot(BOT))

  if (streamSnipe) {
    BOT.emit('onScreenshot', streamSnipe)
  }
  await BOT.login(process.env.DISCORD_TOKEN as string)
})()
