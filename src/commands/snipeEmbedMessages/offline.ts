// export const sleepingFace =
//   'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/sleeping-face_1f634.png'
import { emoji, color } from '../snipeEmbedMessages/snipeMessageConfig.json'

export const offlineEmbed = {
  color: color.red,
  title: '',
  description: 'is currently offline',
  url: '',
  thumbnail: {
    url: emoji.sleepingFace,
  },
  timestamp: new Date(),
  online: false,
}
