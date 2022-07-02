import { color, emoji } from '../snipeEmbedMessages/snipeMessageConfig.json'

export const doesNotExistEmbed = {
  color: color.red,
  title: '',
  description: 'does not exist',
  thumbnail: {
    url: emoji.warning,
  },
  timestamp: new Date(),
  online: false,
}
