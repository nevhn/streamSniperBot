import { doesNotExistEmbed } from '../commands/snipeEmbedMessages/doesNotExist'
import { inLobbyEmbed } from '../commands/snipeEmbedMessages/inLobby'
import { notInLobbyEmbed } from '../commands/snipeEmbedMessages/inGame'
import { offlineEmbed } from '../commands/snipeEmbedMessages/offline'
import { streamSnipe } from './streamSnipe'
import fs from 'fs-extra'

export const generateSnipeReply = async (player: string) => {
  const { flag, streamer } = await fs.readJson('./dist/config/watch.json') // reads the recently modified watch.json
  const { streamUrl, isOnline, inQueue } = await streamSnipe(player)
  const isWatchFlag = streamer !== player ? false : flag

  console.log(JSON.stringify({ streamUrl, isOnline, inQueue, isWatchFlag }, null, 4))
  if (isOnline === undefined) {
    doesNotExistEmbed.title = player
    return doesNotExistEmbed
  }
  if (isOnline === false) {
    offlineEmbed.title = player
    return offlineEmbed
  }

  if (inQueue) {
    inLobbyEmbed.title = player
    inLobbyEmbed.url = streamUrl as string
    inLobbyEmbed.fields[0].value = isWatchFlag.toString()
    return inLobbyEmbed
  }

  notInLobbyEmbed.title = player
  notInLobbyEmbed.url = streamUrl as string
  notInLobbyEmbed.fields[0].value = isWatchFlag.toString()

  return notInLobbyEmbed
}
