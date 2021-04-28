const cheerio = require("cheerio");
const axios = require("axios");
const { base_url } = require("../constant.json")

const getRecentAnime = async () => {
  try {
    let data = await axios({url: base_url})
    data = data.data;
    let recentAnime = []

    let $ = cheerio.load(data);
    $('ul.items li').each(function (i, elem) {
      $ = cheerio.load($(this).html())
      let object = {}
      object.title = $('p.name a').text() || null
      object.episode = $('p.episode').text() || null
      object.image = $('div.img img').attr("src") || null
      object.link = $('div.img a').attr("href") || null
      if (object.link) object.link = base_url + object.link;
      recentAnime.push(object) 
    })

    return recentAnime;
  } catch (err) {
    throw err;
  }
}


module.exports = getRecentAnime;
