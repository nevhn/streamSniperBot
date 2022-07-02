import { fetchTwitchUrl } from '../scripts/fetchTwitchUrl'
import { captureStreamScreenshot } from '../scripts/captureStreamScreenshot'
import { scanImage } from '../scripts/scanImage'
// import { uploadScreenshot } from '../scripts/upload'
import Path from 'path'

interface Snipe {
  // imgurUrl?: string
  streamUrl?: string
  online?: boolean | undefined
  inQueue?: boolean | undefined
}
const path = Path.join(__dirname, '/screenshot/twitch.png') // change to twitch.png
export const streamSnipe = async (streamer: string): Promise<Snipe> => {
  try {
    /**
     * TODO:
     * implement imgur api for debugging purposes (access screenshots from server)
     */
    // const {streamUrl, online} = await fetchTwitchUrl(streamer)
    const { streamUrl, online, mature } = await fetchTwitchUrl(streamer)
    // console.log(twitchResponse)
    if (!streamUrl) return { online }
    await captureStreamScreenshot(streamUrl, mature)
    // const imgurUrl = await uploadScreenshot(img as Buffer)
    // const imgurUrl = 'https://i.imgur.com/3nVVg3o.gif'
    const inQueue = await scanImage(path)
    return {
      streamUrl,
      online,
      inQueue,
      // url,
      // imgurUrl,
      // inQueue,
    }
  } catch (err) {
    console.error(err)
    return {}
  }
}
