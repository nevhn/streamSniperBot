import { fetchTwitchUrl } from '../scripts/fetchTwitchUrl'
import { captureStreamScreenshot } from '../scripts/captureStreamScreenshot'
import { scanImage } from '../scripts/scanImage'
// import { uploadScreenshot } from '../scripts/upload'
import Path from 'path'

interface Snipe {
  url: string | boolean | void | null
  imgurUrl?: string
  inQueue?: boolean | undefined
}
const path = Path.join(__dirname, '/screenshot/twitch.png')
export const streamSnipe = async (streamer: string): Promise<Snipe | undefined> => {
  try {
    const url = await fetchTwitchUrl(streamer)
    if (!url) return { url }
    await captureStreamScreenshot(url as string)
    // const imgurUrl = await uploadScreenshot(path)
    const imgurUrl = 'https://i.imgur.com/3nVVg3o.gif'
    const inQueue = await scanImage(path)
    return {
      url,
      imgurUrl,
      inQueue,
    }
  } catch (err) {
    console.error(err)
    throw new Error('streamSnipe hit a snag')
  }
}
