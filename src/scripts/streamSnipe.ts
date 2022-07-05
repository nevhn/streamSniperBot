import { fetchTwitchUrl } from '../scripts/fetchTwitchUrl'
import { captureStreamScreenshot } from '../scripts/captureStreamScreenshot'
import { scanImage } from '../scripts/scanImage'
import Path from 'path'

interface Snipe {
  streamUrl?: string
  isOnline?: boolean | undefined
  inQueue?: boolean | undefined
}
const path = Path.join(__dirname, '/screenshot/twitch.png') // change to twitch.png
export const streamSnipe = async (streamer: string): Promise<Snipe> => {
  try {
    const { streamUrl, isOnline, isMature } = await fetchTwitchUrl(streamer)
    if (!streamUrl) return { isOnline }
    await captureStreamScreenshot(streamUrl, isMature)
    const inQueue = await scanImage(path)
    return {
      streamUrl,
      isOnline,
      inQueue,
    }
  } catch (err) {
    console.error(err)
    return {}
  }
}
