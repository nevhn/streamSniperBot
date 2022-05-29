import os from 'os'
import puppeteer from 'puppeteer'

export const captureStreamScreenshot = async (): Promise<Buffer | string | undefined> => {
  const site = 'https://www.twitch.tv/videos/1309886508?t=01h39m51s' // insert twitch stream by name
  const player = 'tsm_imperialhal'
  // https://www.twitch.tv/tsm_imperialhal
  /**TODO:
   * grab playername from url -> splice()
   */

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/google-chrome-stable',
    })
    console.log(`navigating to ${player}'s stream 🏃‍♂️ `)
    const page = await browser.newPage()
    const browserPID = browser.process()?.pid
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(site)
    const element = await page.waitForXPath(
      `/html/body/div[1]/div/div[2]/div[1]/div[2]/div/div[2]/div/button`,
    )
    element?.click()
    console.log(`Taking screenshot... 📷  `)
    await page.waitForTimeout(4700)
    const img = await page.screenshot({ path: 'twitch.png' })
    process.kill(browserPID as number)
    console.log('Screenshot taken. ✔ ')
    return img
  } catch (err) {
    return undefined
  }
}
