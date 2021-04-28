const cheerio = require("cheerio");
const axios = require("axios");
const { base_url } = require("../constant.json")
const getFromLink = require("./getFromLink.js");

const getEpisodes = async (name, start, end) => {
if(!name || !start || !end) throw "Invalid parameters in getEpisodes()"
try {
let episodes = []
for(let i = start; i <= end;i++) {
  let object = {}
  object.episode = i;
  let download = await getFromLink(`${base_url}/${name}-episode-${i}`)
  object.download = download.download
  episodes.push(object)
}
return episodes;
} catch(err) {
  throw err;
}
}

module.exports = getEpisodes;
