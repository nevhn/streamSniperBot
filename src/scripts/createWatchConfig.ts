import fs from 'fs-extra'
// import Path from 'path'

// const path = Path.dirname('../../config/watch.json')
// // const path = '../config/watch.json'
// console.log(path)
export const watchConfig = async () => {
  type Watch = {
    streamer: string
    flag: boolean
  }

  const watch: Watch = {
    streamer: '',
    flag: false,
  }

  try {
    await fs.writeJSON('./dist/config/watch.json', watch)
    console.log('generated watch config')
  } catch (err) {
    console.error(err)
  }
}
