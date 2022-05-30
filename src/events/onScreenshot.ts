import { errorHandler } from '../utils/errorHandler'
import { Client, TextChannel } from 'discord.js'

export const onScreenshot = async (
  BOT: Client,
  snipe: string[] | boolean | undefined,
): Promise<void> => {
  const textChannelId = '980644138359873568'
  try {
    const textChannel = (await BOT.channels.cache.get(textChannelId)) as TextChannel
    if (snipe) {
      console.log(snipe)
      textChannel.send('In lobby')
    } else textChannel.send('In game')
    // channel.send(snipe)
    // client.guilds.cache.get("ID").channels.cache.get("ID").send()
  } catch (err) {
    errorHandler('onScreenshot event', err)
  }
}
