import { fetchTwitchUrl } from '../scripts/fetchTwitchUrl'
import { captureStreamScreenshot } from '../scripts/captureStreamScreenshot'
import { scanImage } from '../scripts/scanImage'
import { uploadScreenshot } from '../scripts/upload'
import Path from 'path'

interface Snipe {
  twitchUrl: string | boolean | void | null
  imgurUrl?: string
  inQueue?: boolean | undefined
}
const path = Path.join(__dirname, '/screenshot/twitch.png')
export const streamSnipe = async (streamer: string): Promise<Snipe | undefined> => {
  try {
    const twitchUrl = await fetchTwitchUrl(streamer)
    if (!twitchUrl) return { twitchUrl }
    await captureStreamScreenshot(twitchUrl as string)
    const imgurUrl = await uploadScreenshot(path)
    const inQueue = await scanImage(path)
    return {
      twitchUrl,
      imgurUrl,
      inQueue,
    }
  } catch (err) {
    console.error(err)
    throw new Error('streamSnipe hit a snag')
  }
}
