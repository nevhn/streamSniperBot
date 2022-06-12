import fs from 'fs-extra'
// import Path from 'path'

// const path = Path.join(__dirname, 'watch.json')
// const path = '../config/watch.json'
// console.log(path)
export const watchConfig = async () => {
  //   type Watch = {
  //     streamer: string
  //     flag: boolean
  //   }

  //   const watch: Watch = {
  //     streamer: '',
  //     flag: true,
  //   }

  try {
    await fs.ensureFile('./config/watch.json')
    console.log('success!')
    // await fs.writeJSON('../config/watch.json', watch)
  } catch (err) {
    console.error(err)
  }
}
