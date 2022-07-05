import { errorHandler } from '../utils/errorHandler'
import TwitchApi from 'node-twitch'
import 'dotenv/config'

interface Twitch {
  streamUrl: string
  isOnline: boolean | undefined
  isMature: boolean
}
export const fetchTwitchUrl = async (streamer: string): Promise<Twitch> => {
  let twitchResponse: Twitch = {
    streamUrl: '',
    isOnline: undefined,
    isMature: false,
  }

  try {
    const twitchApi = new TwitchApi({
      client_id: process.env.TWITCH_CLIENT_ID as string,
      client_secret: process.env.TWITCH_CLIENT_SECRET as string,
    })
    const getStreamer = await twitchApi.getUsers(streamer)
    const isStreamer = Boolean(getStreamer?.data.length)

    if (isStreamer) {
      const getStreamInfo = (await twitchApi.getStreams({ channel: streamer })) as any
      const isLive = getStreamInfo.data.length
      if (isLive) {
        const isMature = getStreamInfo.data[0]['is_mature']
        twitchResponse.streamUrl = `https://www.twitch.tv/${streamer}`
        twitchResponse.isOnline = true
        twitchResponse.isMature = isMature
        return twitchResponse
      }
      twitchResponse.isOnline = false
      return twitchResponse
    }

    return twitchResponse
  } catch (err) {
    errorHandler('fetchTwitchUrl', err)
    return twitchResponse
  }
}
