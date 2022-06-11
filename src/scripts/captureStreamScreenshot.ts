import puppeteer from 'puppeteer'
import fs from 'fs-extra'
import useProxy from 'jerry-puppeteer-page-proxy'
// import randomUserAgent from 'random-useragent'
export const captureStreamScreenshot = async (url: string): Promise<boolean> => {
  const dir = './dist/scripts/screenshot'
  const xPath =
    process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : '/usr/bin/google-chrome-stable'
  // console.log(process.platform)
  // console.log(xPath)
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: xPath,
      // args: [
      //   '--proxy-server=http://164.155.150.0:80',
      //   '--ignore-certificate-errors',
      //   '--ignore-certificate-errors-spki-list',
      // ],
      // executablePath: '/usr/bin/google-chrome-stable' -> linux,
      // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' -> macos,
    })
    // console.log(`navigating to ${player}'s stream 🏃‍♂️ `)
    const page = await browser.newPage()
    await useProxy(page, 'http://164.155.150.0:80')
    const browserPID = browser.process()?.pid
    // const userAgent = await randomUserAgent.getRandom()
    // await page.setUserAgent(userAgent)
    await page.setViewport({ width: 1280, height: 720 })
    await page.goto(url)
    const element = await page.waitForXPath(
      `/html/body/div[1]/div/div[2]/div[1]/div[2]/div/div[2]/div/button`,
    )
    element?.click()
    console.log(`Taking screenshot... 📷  `)
    await page.waitForTimeout(4750)
    fs.ensureDirSync(dir) // create directory if it doesn't exist
    await page.screenshot({ path: './dist/scripts/screenshot/twitch.png' })
    process.kill(browserPID as number)
    console.log('Screenshot taken. ✔ ')
    return true
  } catch (err) {
    throw err
  }
}
