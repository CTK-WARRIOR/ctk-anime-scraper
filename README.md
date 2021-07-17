# INTRODUCTION
**ctk-anime-scraper** is the advance and better anime scraper in compare to any other scraper that you could ever find, you can get any anime details.


**`[ You Can not Scrap Anime Episode with this scraper only, it helps you with it but it dont scrap anime episode]`**

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
- 💬 Discord: [Ctk's Server](https://withwin.in/dbd) | [Anime Hub](https://discord.io/anime_hub)
- 🔨 Tools Used: [Axios](https://www.npmjs.com/package/axios) | [Cheerio](https://www.npmjs.com/package/cheerio) 
- 👩‍💻 Developers: CTK WARRIOR#7923

## FEATURES
- Allows you to easily scrap any anime
- Faster than your internet 😅
- Easy to use