/**
 * Required Modules and Variables
 */
const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Gogoanime class to scrap anime from gogoanime
 */
class Gogoanime {

    constructor({base_url}={}) {
        this.base_url = base_url || "https://gogoanime.ai/"
    }

    /**
     * Get the epsiode detials with download link from the gogoanime url        
     * @param  {String} link the anime episode url from gogoanime web
     * @return {Object}      Scraped details of anime episode
     */
	 async getFromLink(link) {
		 if (!link) throw new Error('Missing Parameter: link is not provided.');
		 let htmlContent = await axios({ url: link });
		 let $ = cheerio.load(htmlContent.data);
         const episodeCount = $('ul#episode_page li a.active').attr("ep_end");
         let download = $("li.dowloads a").attr("href");
         if (!download) throw new Error("Scraping Error: Unable to scrap the downlaod link"); 
         const ScrapedAnime = {
            name: $('div.anime_video_body h1').text() || null,
            episodeCount,
            id: download.match(/([A-Z])\w+/g)[0]
         }

    return ScrapedAnime;
   }


   /**
    * Search anime with the name
    * @param  {String} name         name of the anime
    * @param  {String|Number} options.page page number of search result.     
    * @return {Array}              Search result of given anime name
    */
   async search(name, { page="1" }={}) {
        if (!name) throw new Error('Missing Parameter: anime name is not provided.');
        const BaseURL = this.base_url
        const htmlContent = await axios({ url: BaseURL + "/search.html?keyword=" + name + "&page=" + page  });
        let $ = cheerio.load(htmlContent.data);
        const searchResults = [];

        $('ul.items li').each(function(i, elem) {
            let anime = {}
            $ = cheerio.load($(elem).html());
            anime.title = $('p.name a').text() || null;
            anime.img = $('div.img a img').attr('src') || null;
            anime.link = $('div.img a').attr('href') || null;
            anime.releaseDate = $('p.released').text().trim() || null;
            if (anime.link) anime.link = BaseURL + anime.link;

            searchResults.push(anime);
        })

        return searchResults;
   } 

   /**
    * Get any episode of your anime
    * @param  {String} name  name of the anime but it should be slug name of the anime
    * @param  {Number|String} episode  episode number of anime
    * @return {Object}       Episode details and links
    */
   async getEpisodes(name, episode) {
    if(!name) throw new Error("Missing Parameters: anime name is not provided.");
    if(!episode) throw new Error("Missing Parameters: anime episode number is not provided");
    const Episode = await this.getFromLink(`${this.base_url}/${name}-episode-${episode}`).catch(err => { });

    return Episode ? Episode : {}
}
   
   /**
    * Fetch anime details with anime link
    * @param  {String} link 
    * @return {Object}      
    */
   async fetchAnime(link) {
    if (!link) throw new Error('Missing Parameter: anime link is not provided.');
    const htmlContent = await axios({ url: link });
    const $ = cheerio.load(htmlContent.data);
    let animeData = {
        name: $('div.anime_info_body_bg h1').text() || null,
        image: $('div.anime_info_body_bg img').attr("src"),
        episodeCount: $('ul#episode_page li a.active').attr("ep_end"),
        slug: link.split("/category/")[1]
    }

    $('div.anime_info_body_bg p.type').each(function(i, elem) {
        const $x = cheerio.load($(elem).html())
        let keyName = $x('span').text().toLowerCase().replace(":", "").trim().replace(/ /g, "_")
        if (/plot_summary|released|other_name/g.test(keyName)) animeData[keyName] = $(elem).html().replace(`<span>${$x('span').text()}</span>`, '')
        else animeData[keyName] = $x('a').text().trim() || null
    })

  return animeData;
 }

/**
 * Get recent added anime
 * @return {Array} list of anime
 */
 async getRecentAnime() {
    const BaseURL = this.base_url;
    const htmlContent = await axios({url: BaseURL});
    let $ = cheerio.load(htmlContent.data);
    const recentAnime = []

    $('ul.items li').each(function (i, elem) {
      $ = cheerio.load($(elem).html())
      const anime = {
        title: $('p.name a').text() || null,
        episode: $('p.episode').text() || null,
        image: $('div.img img').attr("src") || null,
        link: BaseURL + $('div.img a').attr("href") 
      }
      recentAnime.push(anime) 
    })
    return recentAnime;
 }

/**
 * Get the list of popular anime availabe on website
 * @return {Array} 
 */
 async getPopularAnime() {
     const BaseURL = this.base_url;
    const htmlContent = await axios({url: BaseURL + "/popular.html"});
    let $ = cheerio.load(htmlContent.data);
    const popularAnime = []

    $('ul.items li').each(function (i, elem) {
      $ = cheerio.load($(elem).html())
      const anime = {
        title: $('p.name a').text() || null,
        episode: $('p.episode').text() || null,
        image: $('div.img img').attr("src") || null,
        link: BaseURL + $('div.img a').attr("href") 
      }
      popularAnime.push(anime) 
    })
    return popularAnime;
 }

}

module.exports = Gogoanime;