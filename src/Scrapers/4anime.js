/**
 * Required Modules and Variables
 */
const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Gogoanime class to scrap anime from gogoanime
 */
class Fouranime {

  constructor({ base_url } = {}) {
    this.base_url = base_url || "https://4anime.to/"
  }


  /**
   * Get recent added anime
   * @return {Array} list of anime
   */
  async getRecentAnime(url=this.base_url) {
    const html = await this.fetch(url).catch(err => {})
    if(!html) return []
    const list = []
    let $ = cheerio.load(html)
    
    $('div#urcontent div#headerDIV_4').each(function(i, elem) {
       $ = cheerio.load($(elem).html())
      const anime = $('div#aroundimage img').attr('title').split(" Episode ")
      list.push({
        title: anime[0] || null,
        epiosde: anime[1] || null,
        image: url + $('img').attr('src'),
        link: $('a').attr('href')
      })
    })

    return list;
  }

  async getFromLink(link) {
    const html = await this.fetch(link).catch(err => {})
    if(!html) return {}
    let $ = cheerio.load(html)

    const animeObject = {
      name: $('a#titleleft').attr('title'),
      currentEpisode: $('a.active').text(),
      episodeCount: $('ul.episodes.range.active li').length,
      download: [
        { quality: "1080p", link: $('source').attr('src') }
      ]
    }

    return animeObject;
  }


  async search(name) {
    const html = await this.fetch(this.base_url + "/?s=" + name).catch(err => {})
    if(!html) return []
     let $ = cheerio.load(html)

    let list = []

    $('div#headerDIV_2').each((i, elem) => {
       $ = cheerio.load($(elem).html())
      list.push({
        title: $('a div').text(),
        img: $('img').attr('src'),
        link: $('a').attr('href')
      })
   })
    
  return list.slice(1)
  }


  async fetchAnime(link) {
    const html = await this.fetch(link).catch(err => {})
    if(!html) return {}
    let $ = cheerio.load(html)

    const animeObject = {
      name: $('p.single-anime-desktop').text(),
      image: this.base_url + $('div.cover img').attr('src'),
      episodeCount: $('ul.episodes.range.active li').length,
      episodes: [],
      slug: link.split("/")[4]

    }

    $('ul.episodes.range.active li').each((i, v) => {
        let data = cheerio.load($(v).html()) 
        animeObject.episodes.push({ number: $(v).text(), link: data('a').attr('href') }) 
    })

    $('div.detail').each((i, elem) => {
      $ = cheerio.load($(elem).html())
      animeObject[$('div.title-side').text().toLowerCase().replace(/ /g, "_")] = $('a').text()
    })

    return animeObject
  }


  async fetch(url) {
    const { data } = await axios.get(url, {
      headers: {
        cookie: "_ga=GA1.2.395654370.1625411018; _gid=GA1.2.858132707.1625411018; _gat_gtag_UA_50627463_3=1; asl_data=qtranslate_lang%3D0%26set_intitle%3DNone%26customset%255B%255D%3Danime; asl_phrase=Naruto; bbl=2"
      }
    })
    return data;
  }
}

module.exports = Fouranime