import { doesNotExistEmbed } from '../commands/snipeEmbedMessages/doesNotExist'
import { inLobbyEmbed } from '../commands/snipeEmbedMessages/inLobby'
import { notInLobbyEmbed } from '../commands/snipeEmbedMessages/notInLobby'
import { offlineEmbed } from '../commands/snipeEmbedMessages/offline'
import { streamSnipe } from './streamSnipe'
export const generateSnipeReply = async (streamer: string) => {
  const snipe = await streamSnipe(streamer)
  console.log(snipe)
  /**TODO:
   * merge embeds (less is more)
   * show watch status
   */
  if (snipe?.online === undefined) {
    doesNotExistEmbed.title = streamer
    return doesNotExistEmbed
  }
  if (snipe?.online === false) {
    offlineEmbed.title = streamer
    return offlineEmbed
  }

  if (snipe?.inQueue) {
    inLobbyEmbed.title = streamer
    inLobbyEmbed.url = snipe.streamUrl as string
    return inLobbyEmbed
  }

  notInLobbyEmbed.title = streamer
  notInLobbyEmbed.url = snipe?.streamUrl as string
  return notInLobbyEmbed
}
