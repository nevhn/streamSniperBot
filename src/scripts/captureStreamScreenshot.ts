import puppeteer from 'puppeteer'
import fs from 'fs-extra'

export const captureStreamScreenshot = async (url: string): Promise<boolean | undefined> => {
  const dir = './dist/scripts/screenshot'
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/google-chrome-stable',
    })
    // console.log(`navigating to ${player}'s stream 🏃‍♂️ `)
    const page = await browser.newPage()
    const browserPID = browser.process()?.pid
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(url)
    const element = await page.waitForXPath(
      `/html/body/div[1]/div/div[2]/div[1]/div[2]/div/div[2]/div/button`,
    )
    element?.click()
    console.log(`Taking screenshot... 📷  `)
    await page.waitForTimeout(4700)
    fs.ensureDirSync(dir) // create directory if it doesn't exist
    await page.screenshot({ path: './dist/scripts/screenshot/twitch.png' })
    process.kill(browserPID as number)
    console.log('Screenshot taken. ✔ ')
    return true
  } catch (err) {
    console.error(err)
    return undefined
  }
}
