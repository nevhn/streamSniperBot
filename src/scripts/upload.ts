import { ImgurClient } from 'imgur'
import 'dotenv/config'
import { createReadStream } from 'fs-extra'
export const uploadScreenshot = async (path: string): Promise<string> => {
  const client = new ImgurClient({ clientId: process.env.IMGUR_CLIENT_ID })
  const response = await client.upload({
    image: createReadStream(path) as unknown as Buffer,
    type: 'stream',
  })
  //   console.log(response.data)
  const url = response.data.link
  console.log(url)
  return url
}
