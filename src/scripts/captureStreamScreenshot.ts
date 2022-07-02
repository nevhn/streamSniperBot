import fs from 'fs-extra'
import puppeteer from 'puppeteer'
/**
 * TODO:
 * [x] Click 'start watching' on mature streams
 *      - [x] write logic code for non-mature streams
 */
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
    console.log(`navigating to stream 🏃‍♂️`)
    const page = (await browser.pages())[0]
    await page.setUserAgent(userAgent)
    // const page = await browser.newPage()
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
    // const fullscreenButton = await page.waitForXPath(
    //   // '#root > div > div.Layout-sc-nxg1ff-0.bSuLAT > div.Layout-sc-nxg1ff-0.hVqkZv > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.InjectLayout-sc-588ddc-0.persistent-player > div > div.Layout-sc-nxg1ff-0.video-player > div > div.Layout-sc-nxg1ff-0.video-ref > div > div > div:nth-child(6) > div > div.Layout-sc-nxg1ff-0.jzsWfm > div.Layout-sc-nxg1ff-0.dIyPHK.player-controls__right-control-group > div:nth-child(5) > button',
    //   '/html/body/div[1]/div/div[2]/div[1]/main/div[2]/div[3]/div/div/div[2]/div/div[2]/div/div[2]/div/div/div[8]/div/div[2]/div[2]/div[5]/button',
    // )
    // await fullscreenButton?.click()
    await collapse?.click()
    await page.waitForTimeout(4000)

    console.log(`Taking screenshot... 📷  `)
    fs.ensureDirSync(dir) // create directory if it doesn't exist
    await page.screenshot({ path: './dist/scripts/screenshot/twitch.png' })
    process.kill(browserPID as number)
    return true
  } catch (err) {
    throw err
  }
}
