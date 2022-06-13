import { doesNotExistEmbed } from '../commands/snipeEmbedMessages/doesNotExist'
import { inLobbyEmbed } from '../commands/snipeEmbedMessages/inLobby'
import { notInLobbyEmbed } from '../commands/snipeEmbedMessages/notInLobby'
import { offlineEmbed } from '../commands/snipeEmbedMessages/offline'
import { streamSnipe } from './streamSnipe'

export const generateSnipeReply = async (streamer: string) => {
  const snipe = await streamSnipe(streamer)
  console.log(snipe)
  if (snipe?.twitchUrl === null) {
    doesNotExistEmbed.title = streamer
    return doesNotExistEmbed
  }
  if (snipe?.twitchUrl === false) {
    offlineEmbed.title === streamer
    return offlineEmbed
  }

  if (snipe?.inQueue) {
    inLobbyEmbed.title = streamer
    inLobbyEmbed.url = snipe.twitchUrl as string
    inLobbyEmbed.image.url = snipe.imgurUrl as string
    return inLobbyEmbed
  }
  notInLobbyEmbed.title = streamer
  notInLobbyEmbed.url = snipe?.twitchUrl as string
  notInLobbyEmbed.image.url = snipe?.imgurUrl as string
  return notInLobbyEmbed
}
