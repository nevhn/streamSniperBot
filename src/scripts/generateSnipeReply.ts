import { doesNotExistEmbed } from '../commands/snipeEmbedMessages/doesNotExist'
import { inLobbyEmbed } from '../commands/snipeEmbedMessages/inLobby'
import { notInLobbyEmbed } from '../commands/snipeEmbedMessages/notInLobby'
import { offlineEmbed } from '../commands/snipeEmbedMessages/offline'
import { streamSnipe } from './streamSnipe'

export const generateSnipeReply = async (streamer: string) => {
  const snipe = await streamSnipe(streamer)
  console.log({ streamer: snipe })
  /**TODO:
   * send attachments instead of imgur links
   * see ->  https://stackoverflow.com/questions/51199950/how-do-i-use-a-local-image-on-a-discord-js-rich-embed
   */
  if (snipe?.url === null) {
    doesNotExistEmbed.title = streamer
    return doesNotExistEmbed
  }
  if (snipe?.url === false) {
    offlineEmbed.title = streamer
    return offlineEmbed
  }

  if (snipe?.inQueue) {
    inLobbyEmbed.title = streamer
    inLobbyEmbed.url = snipe.url as string
    inLobbyEmbed.image.url = snipe.imgurUrl as string
    return inLobbyEmbed
  }

  notInLobbyEmbed.title = streamer
  notInLobbyEmbed.url = snipe?.url as string
  notInLobbyEmbed.image.url = snipe?.imgurUrl as string
  return notInLobbyEmbed
}
