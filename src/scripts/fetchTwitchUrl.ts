import axios from 'axios'
export const fetchTwitchUrl = async (streamer: string) => {
  //   return `https://www.twitch.tv/${streamer}`
  console.log(streamer)
  const response = await axios('https://www.twitch.tv/snip89322gbh')
  //   TODO: Hook up twitch api
  //   const response = await axios('https://www.twitch.tv/snip3down')

  console.log(response)
}

fetchTwitchUrl('sd')
