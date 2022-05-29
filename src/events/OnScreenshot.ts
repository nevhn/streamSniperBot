import { errorHandler } from '../utils/errorHandler'
import { Client } from 'discord.js'
export const OnScreenshot = async (BOT: Client): Promise<void> => {
  try {
  } catch (err) {
    errorHandler('OnScreenshot event', err)
  }
}
