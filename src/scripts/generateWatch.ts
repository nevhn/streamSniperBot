import fs from 'fs-extra'
export const watchConfig = async (streamer: string = '', flag: boolean = false) => {
  type Watch = {
    streamer: string
    flag: boolean
  }

  const watch: Watch = {
    streamer: streamer,
    flag: flag,
  }

  try {
    await fs.writeJSON('./dist/config/watch.json', watch)
  } catch (err) {
    console.error(err)
  }
}
