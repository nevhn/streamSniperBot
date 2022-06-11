import { fetchTwitchUrl } from '../scripts/fetchTwitchUrl'
import { captureStreamScreenshot } from '../scripts/captureStreamScreenshot'
// import { checkIfFileExists, path } from '../scripts/checkIfFileExists'
import { scanImage } from '../scripts/scanImage'
import { uploadScreenshot } from '../scripts/upload'
import Path from 'path'

const path = Path.join(__dirname, '/screenshot/twitch.png')
interface Snipe {
  twitchUrl: string | boolean | void
  imgurUrl?: string
  inQueue?: boolean | undefined
}
export const streamSnipe = async (
  streamer: string,
  _watch: boolean = false,
): Promise<Snipe | undefined> => {
  try {
    // console.log(_watch)
    const twitchUrl = await fetchTwitchUrl(streamer)
    console.log('twitchUrl: ', twitchUrl)
    if (!twitchUrl) return { twitchUrl }
    await captureStreamScreenshot(twitchUrl as string)
    // await checkIfFileExists(path) // might be redudant
    const imgurUrl = await uploadScreenshot(path)
    console.log('imgurUrl', imgurUrl)
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
