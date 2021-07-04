# INTRODUCTION
**ctk-anime-scraper** is the advance and better anime scraper in compare to any other scraper that you could ever find, you can get any anime details and it's direct episode link in just few lines of codes.

## 4anime
```js 
const AnimeScraper = require("ctk-anime-scraper")
const FourAnime = new AnimeScraper.FourAnime()

/* Search Anime */
FourAnime.search("naruto").then(results => {
/* Get the top result from search and fetch that anime */
	FourAnime.fetchAnime(results[0].link).then(anime => {
	/* Get the 1st Episode of the anime */
		FourAnime.getFromLink(anime.episodes[0].link).then(episode => {
		/* Here you have it, Enjoy 😉 */
			console.log(episode) // {Object}
		})
	})
})

```




```js
const AnimeScraper = require("ctk-anime-scraper")
const Gogoanime = new AnimeScraper.Gogoanime()

/* Search Anime */
Gogoanime.search("naruto").then(results => {
/* Get the top result from search and fetch that anime */
	Gogoanime.fetchAnime(results[0].link).then(anime => {
	/* Get the 1st Episode of the anime */
		Gogoanime.getEpisodes(anime.slug, 1).then(episode => {
		/* Here you have it, Enjoy 😉 */
			console.log(episode) // {Object}
		})
	})
})
```

## LINKS
- 📃 Guide/Docs: [Documents](https://ctk-doc.gitbook.io/ctk-anime-scraper/) 
- 💬 Discord: [Ctk's Server]([https://withwin.in/dbd](https://withwin.in/dbd)) | [Anime Hub](https://discord.io/anime_hub)
- 🔨 Tools Used: [Axios](https://www.npmjs.com/package/axios) | [Cheerio](https://www.npmjs.com/package/cheerio) 
- 👩‍💻 Developers: CTK WARRIOR#7923
- Supported Websites: [Gogoanime.ai](https://gogoanime.ai/) | [Gogoanime.vc](https://gogoanime.vc/) | [4anime.to](https://4anime.to/)

## FEATURES
- Allows you to easily scrap any anime
- Get any episode direct link of any available quality
- Faster than your internet 😅
- Supports more than one website to scrap
- Easy to use