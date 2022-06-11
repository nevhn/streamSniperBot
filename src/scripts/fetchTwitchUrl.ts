import { errorHandler } from '../utils/errorHandler'
import TwitchApi from 'node-twitch'
import 'dotenv/config'

export const fetchTwitchUrl = async (streamer: string): Promise<string | boolean | void> => {
  try {
    const twitch = new TwitchApi({
      client_id: process.env.TWITCH_CLIENT_ID as string,
      client_secret: process.env.TWITCH_CLIENT_SECRET as string,
    })
    const getStreamer = await twitch.getUsers(streamer)
    // console.log('getStreamer: ', getStreamer)
    const userExists = Boolean(getStreamer?.data.length)
    console.log('userExists: ', userExists)
    // console.log('streamer', streamer)
    if (userExists) {
      const getStream = await twitch.getStreams({ channel: streamer })
      const streamIsLive = getStream.data.length
      if (streamIsLive) {
        return `https://www.twitch.tv/${streamer}`
      }
      console.log('streamer is offline')
      return false
    }
    return undefined
  } catch (err) {
    errorHandler('fetchTwitchUrl', err)
  }
}
