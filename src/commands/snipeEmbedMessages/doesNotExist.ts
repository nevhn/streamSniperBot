// export const warning =
//   'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/warning_26a0-fe0f.png'

import { emoji, color } from '../snipeEmbedMessages/snipeMessageConfig.json'
export const doesNotExistEmbed = {
  color: color.darkGrey,
  title: '',
  description: 'does not exist',
  thumbnail: {
    url: emoji.warning,
  },
  timestamp: new Date(),
  online: false,
}
