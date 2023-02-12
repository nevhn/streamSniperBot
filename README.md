# streamSniperBot

A Discord bot that notifies you when a streamer is in a game lobby by using node-tesseract-ocr to extract text from a screenshot of the streamer's page on twitch.tv. This project was made for entertainment purposes and is not a serious, well-maintained project (just a goof). It has been tested for Apex Legends streamers and may have inconsistent results due to the nature of navigating twitch.tv with Puppeteer.


### Features/Commands
- `!snipe 'insert streamer here'` 

  Checks if the streamer is online or offline. If they are online, the bot will attempt to take a screenshot of the stream and run it through node-tesseract-ocr to detect any keywords that suggest they are in a lobby. 

- `!watch 'insert streamer here'`

  Does the same thing as the !snipe command but keeps a listening event on. User won't be notifed until the streamer is in the lobby.

- `!stop`

  Stops the 'watch' command. 


### Note
---
This project was made for entertainment purposes and is not guaranteed to work consistently due to the limitations of navigating twitch.tv with puppeteer.
