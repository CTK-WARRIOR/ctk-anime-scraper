const cheerio = require("cheerio");
const axios = require("axios");
const { base_url } = require("../constant.json")
const getPopularAnime = async () => {
  try {
    let data = await axios({url: `${base_url}/popular.html`})
    data = data.data;
    let popularAnime = []

    let $ = cheerio.load(data);
    $('ul.items li').each(function (i, elem) {
      $ = cheerio.load($(this).html())
      let object = {}
      object.title = $('p.name a').text() || null
      object.episode = $('p.episode').text() || null
      object.image = $('div.img img').attr("src") || null
      object.link = $('div.img a').attr("href") || null
      if (object.link) object.link = base_url + object.link;
      popularAnime.push(object) 
    })

    return popularAnime;
  } catch (err) {
    throw err;
  }
}


module.exports = getPopularAnime;
