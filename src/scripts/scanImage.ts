import os from 'os'
import tesseract from 'node-tesseract-ocr'

const conditions = ['ranked leagues', 'match summary', 'cancel', 'season hub', 'matchmaking']

const config = {
  lang: 'eng',
  oem: 1,
  psm: 3,
}

export const scanImage = async (path: string) => {
  try {
    const rawText = await tesseract.recognize(path, config)
    const parsedText = rawText.toLowerCase().split(os.EOL)
    console.log('image was scanned: ', parsedText)
    console.log('image was scanned')
    // return parsedText.includes('ranked leagues' || 'match summary')
    return parsedText.some((e) => conditions.indexOf(e) >= 0)
  } catch (error) {
    console.error('No image: ', error)
    return undefined
  }
}
