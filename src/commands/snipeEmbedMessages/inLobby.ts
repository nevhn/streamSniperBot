// export const checkMarkButton =
//   'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/check-mark-button_2705.png'
// export const bullseye =
//   'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/direct-hit_1f3af.png'

import { emoji, color } from '../snipeEmbedMessages/snipeMessageConfig.json'
export const inLobbyEmbed = {
  color: color.green,
  title: '',
  url: '',
  description: 'In lobby!',
  fields: [
    {
      name: 'watch flag',
      value: 'false',
    },
  ],
  author: {
    url: emoji.bullseye,
  },
  thumbnail: {
    url: emoji.checkMarkButton,
  },
  image: {
    url: 'attachment://twitch.png',
  },
  timestamp: new Date(),
  online: true,
}
