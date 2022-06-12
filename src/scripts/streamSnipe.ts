import { fetchTwitchUrl } from '../scripts/fetchTwitchUrl'
import { captureStreamScreenshot } from '../scripts/captureStreamScreenshot'
// import { checkIfFileExists, path } from '../scripts/checkIfFileExists'
import { scanImage } from '../scripts/scanImage'
import { uploadScreenshot } from '../scripts/upload'
import Path from 'path'

interface Snipe {
  twitchUrl: string | boolean | void
  imgurUrl?: string
  inQueue?: boolean | undefined
}
const path = Path.join(__dirname, '/screenshot/twitch.png')
export const streamSnipe = async (streamer: string): Promise<Snipe | undefined> => {
  try {
    // console.log(_watch)
    // cachedStreamer = streamer
    // console.log('cachedStreamer: ', cachedStreamer)
    const twitchUrl = await fetchTwitchUrl(streamer)
    // console.log('twitchUrl: ', twitchUrl)
    if (!twitchUrl) return { twitchUrl }
    await captureStreamScreenshot(twitchUrl as string)
    // await checkIfFileExists(path) // might be redudant
    const imgurUrl = await uploadScreenshot(path)
    console.log('imgurUrl: ', imgurUrl)
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
