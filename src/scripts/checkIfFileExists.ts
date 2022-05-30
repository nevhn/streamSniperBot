import Path from 'path'
import fs from 'fs'

export const path = Path.join(__dirname, '/screenshot/twitch.png')
// console.log(path)
export const checkIfFileExists = async (path: string) => {
  try {
    await fs.promises.access(path)
    console.log('screenshot exists ✅ ')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
