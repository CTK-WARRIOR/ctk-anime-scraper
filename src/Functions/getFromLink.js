const cheerio = require("cheerio");
const axios = require("axios");

const getFromLink = async (link) => {
  if (!link) throw "Link not provided";
  try {
    let data = await axios({ url: link });
    let $ = cheerio.load(data.data);
    let episodeCount = $('ul#episode_page li a.active').attr("ep_end"); 
    let download = $("li.dowloads a").attr("href");
    if (!download) throw "Unable to scrap the downlaod link";
    data = await axios({ url: download });
    $ = cheerio.load(data.data);
    download = []
    let extraLink = []
    let name = $('span#title').text() || null
    $("div.dowload").each(function(i, elem) {
      let object = {}
      $ = cheerio.load($(this).html())
      object.quality = $('a').text().replace("Download\n", "").trim()
      object.link = $('a').attr("href")
      if (object.quality.startsWith("(")) download.push(object)
      else extraLink.push(object)
    })

    return { name, episodeCount, download, extraLink }
  } catch (err) {
    throw err;
  }
}

module.exports = getFromLink;
