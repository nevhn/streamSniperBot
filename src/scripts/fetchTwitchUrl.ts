import TwitchApi from 'node-twitch'
import 'dotenv/config'

export const fetchTwitchUrl = async (
  streamer: string = 'xqc',
): Promise<string | boolean | undefined> => {
  const twitch = new TwitchApi({
    client_id: process.env.TWITCH_CLIENT_ID as string,
    client_secret: process.env.TWITCH_CLIENT_SECRET as string,
  })
  const getStreamer = await twitch.getUsers(streamer)
  const userExists = Boolean(getStreamer.data.length)
  console.log('userExists', userExists)
  //   console.log('streamer', streamer)
  if (userExists) {
    const getStream = await twitch.getStreams({ channel: 'xqc   ' })
    const streamIsLive = getStream.data.length
    if (streamIsLive) {
      return `https://www.twitch.tv/${streamer}`
    }
    return false
  }
  return undefined
}
