// export const crossMark =
//   'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/cross-mark_274c.png'
// export const bullseye =
//   'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/direct-hit_1f3af.png'
import { emoji, color } from './snipeMessageConfig.json'
export const notInLobbyEmbed = {
  color: color.yellow,
  title: '',
  url: '',
  description: 'In a game or something',
  fields: [
    {
      name: 'watch flag',
      value: 'false',
    },
  ],
  // author: {
  //   name: `watch flag: ${}`,
  //   icon_url: emoji.bullseye,
  // },
  thumbnail: {
    url: emoji.crossMark,
  },
  image: {
    url: 'attachment://twitch.png',
  },
  timestamp: new Date(),
  online: true,
}
