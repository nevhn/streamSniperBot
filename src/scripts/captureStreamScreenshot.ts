import fs from 'fs-extra'
import puppeteer from 'puppeteer'
import { logHandler } from '../utils/logHandler'
export const captureStreamScreenshot = async (
  url: string,
  mature?: boolean,
): Promise<Boolean | undefined | void> => {
  const dir = './dist/scripts/screenshot'
  // const authToken = 'c9k5chu0wjayk5ytpzkthyzwpvkexp'
  const exPath =
    process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : '/usr/bin/chromium-browser'
  // : '/usr/bin/google-chrome-stable'

  try {
    const userAgent =
      'Mozilla/5.0 (X11; Linux x86_64)' +
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: exPath,
      //       args: [
      //         '--disable-web-security',
      //         '--disable-features=IsolateOrigins,site-per-process',
      //         '--no-sandbox',
      //         '--disable-setuid-sandbox',
      //         '--disable-infobars',
      //         '--window-position=0,0',
      //         '--ignore-certifcate-errors',
      //         '--ignore-certifcate-errors-spki-list',
      //         '--user-agent=hhh',
      //       ],
    })
    const page = (await browser.pages())[0]
    // const page = await browser.newPage()
    await page.setUserAgent(userAgent)
    const browserPID = browser.process()?.pid
    await page.setViewport({ width: 1980, height: 1080, deviceScaleFactor: 2.5 })
    await page.goto(url)
    await page.evaluate(() => {
      const sessionData = JSON.stringify({ default: '480p30' })
      localStorage.setItem('video-quality', sessionData)
    })

    await page.reload()
    const collapse = await page.waitForSelector(
      '#sideNav > div > div > div > div.simplebar-scroll-content > div > div > div.Layout-sc-nxg1ff-0.deMmmw.collapse-toggle > div > button',
    )
    if (mature) {
      // bypass mature streams
      const startWatchingBtn = await page.waitForSelector(
        '#root > div > div.Layout-sc-nxg1ff-0.bSuLAT > div.Layout-sc-nxg1ff-0.hVqkZv > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.InjectLayout-sc-588ddc-0.persistent-player > div > div.Layout-sc-nxg1ff-0.video-player > div > div.Layout-sc-nxg1ff-0.video-ref > div > div > div.Layout-sc-nxg1ff-0.fPrwsJ.player-overlay-background.player-overlay-background--darkness-0.content-overlay-gate > div > div.Layout-sc-nxg1ff-0.knaoBk.content-overlay-gate__allow-pointers > button',
      )
      await startWatchingBtn?.click()
    }
    await collapse?.click()
    await page.waitForTimeout(4000)

    fs.ensureDirSync(dir) // create directory if it doesn't exist
    await page.screenshot({ path: './dist/scripts/screenshot/twitch.png' })
    process.kill(browserPID as number)
    logHandler.log('info', `📷screenshot taken`)
    return true
  } catch (err) {
    throw err
  }
}
