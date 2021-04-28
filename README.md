# CTK ANIME SCRAPER
**scraper to scrap anime from gogoanime**

### Search And Scrap
```js
const Anime = require("ctk-anime-scraper");

Anime.search('demon slayer').then((data) => {
  if(!data.length) return console.log("No Anime with this name found")
	Anime.fetchAnime(data[0].link, { episode: 1 }).then(data => console.log(data))
});
```

### Scrap in Mass
```js
const Anime = require("ctk-anime-scraper");

Anime.search('naruto').then((data) => {
  if(!data.length) return console.log("No Anime with this name found")
	Anime.fetchAnime(data[0].link, { mass_episodes: 10 }).then(data => console.log(data))
});
```

### Scrap Whole Data
```js
const Anime = require("ctk-anime-scraper");

Anime.search('naruto').then((data) => {
  if(!data.length) return console.log("No Anime with this name found")
	Anime.fetchAnime(data[0].link).then(data => console.log(data))
});
```

### Scrap Recent Anime
```js
const Anime = require("ctk-anime-scraper");

Anime.getRecentAnime().then(data => {
  console.log(data)
})
```

### Scrap Popular Anime
```js
const Anime = require("ctk-anime-scraper");

Anime.getPopularAnime().then(data => {
  console.log(data)
})
```

## Documents
```Coming sooon.........................```


## JOIN US
https://withwin.in/dbd
