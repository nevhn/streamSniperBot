import { onReady } from './events/onReady'
import { IntentOptions } from './config/IntentOptions'
import { onInteraction } from './events/onInteraction'
import { Client } from 'discord.js'
import { onScreenshot } from './events/onScreenshot'
import 'dotenv/config'
import { captureStreamScreenshot } from './scripts/captureStreamScreenshot'
import { checkIfFileExists, path } from './scripts/checkIfFileExists'
import { scanImage } from './scripts/scanImage'
;(async () => {
  const BOT = new Client({ intents: IntentOptions })
  const url = ''
  BOT.on('ready', async () => await onReady(BOT))
  BOT.on('interactionCreate', async (interaction) => await onInteraction(interaction))
  BOT.on('onScreenshot', async (snipe) => await onScreenshot(BOT, snipe))

  const streamSnipe = async () => {
    try {
      const screenshot = await captureStreamScreenshot(url)
      const fileExists = await checkIfFileExists(path)
      console.log(screenshot, fileExists)
      if (screenshot && fileExists) {
        console.log('✅')
        const snipe = await scanImage(path)
        BOT.emit('onScreenshot', snipe)
      } else {
        console.log('something went wrong')
      }
    } catch (err) {
      console.error(err)
    }
  }

  streamSnipe()

  // const interval = 60000
  // setInterval(() => {
  //   streamSnipe()
  // }, interval)

  // if (streamSnipe) {
  // }

  await BOT.login(process.env.DISCORD_TOKEN as string)
})()
