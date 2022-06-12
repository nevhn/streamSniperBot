import { CommandInt } from '../interfaces/CommandInt'
import { errorHandler } from '../utils/errorHandler'
import { inLobbyEmbed } from './snipeEmbedMessages/inLobby'
import { notInLobbyEmbed } from './snipeEmbedMessages/notInLobby'
import { doesNotExistEmbed } from './snipeEmbedMessages/doesNotExist'
import { offlineEmbed } from './snipeEmbedMessages/offline'
import { streamSnipe } from '../scripts/streamSnipe'
import fs from 'fs/promises'
import { SlashCommandBuilder } from '@discordjs/builders'
import { logHandler } from '../utils/logHandler'

export const snipe: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription('Snipe your preferred streamer')
    .addStringOption((option) =>
      option.setName('streamer').setDescription('Enter a streamer').setRequired(true),
    )
    .addBooleanOption((option) =>
      option.setName('watch').setDescription('enable constant updates on streamer'),
    ) as SlashCommandBuilder,
  run: async (interaction: any, streamerFlag?: string) => {
    try {
      await interaction.deferReply()

      const watchOption = interaction.options.getBoolean('watch')
      const streamer = streamerFlag ? streamerFlag : interaction.options.getString('streamer')
      const snipe = await streamSnipe(streamer)

      if (snipe?.twitchUrl === undefined) {
        doesNotExistEmbed.title = streamer
        await interaction.editReply({ embeds: [doesNotExistEmbed] })
        logHandler.log(`info`, `${streamer} does not exist`)
        return
      }
      if (snipe.twitchUrl === false) {
        offlineEmbed.title = streamer
        offlineEmbed.url = `https://twitch.tv/${streamer}`
        await interaction.editReply({ embeds: [offlineEmbed] })
        logHandler.log(`info`, `${streamer} is currently offline `)
        return
      }
      await interaction.editReply(`Sniping ${streamer} 🎯 🔫 ...`)
      if (snipe.inQueue) {
        inLobbyEmbed.title = streamer
        inLobbyEmbed.url = snipe.twitchUrl as string
        inLobbyEmbed.image.url = snipe.imgurUrl as string
        await interaction.editReply({ embeds: [inLobbyEmbed] })
        return
      }

      notInLobbyEmbed.title = streamer
      notInLobbyEmbed.url = snipe.twitchUrl as string
      notInLobbyEmbed.image.url = snipe.imgurUrl as string
      await interaction.editReply({ embeds: [notInLobbyEmbed] })

      if (watchOption) {
        const watch = {
          streamer,
          flag: watchOption,
        }
        const data = JSON.stringify(watch, null, 2)
        await fs.writeFile('./dist/commands/watch.json', streamer)
        console.log(data)
      }
      logHandler.log(`info`, `sniped ${streamer} `)
      return
    } catch (err) {
      errorHandler('snipe command', err)
      await interaction.editReply('Something went wrong')
      return
    }
  },
}

// setInterval(() => {
//   streamSnipe(streamer, (watch = true))
// }, 15000)
