import fs from 'fs-extra'
import { logHandler } from '../utils/logHandler'
// import Path from 'path'

// const path = Path.dirname('../../config/watch.json')
// // const path = '../config/watch.json'
// console.log(path)
export const watchConfig = async (streamer: string = '', flag: boolean = false) => {
  /**TODO:
   * export type
   */
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
    logHandler.log('info', 'regenerated watch config')
  } catch (err) {
    console.error(err)
  }
}
