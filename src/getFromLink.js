const cheerio = require("cheerio");
const axios = require("axios");

const getFromLink = async (link) => {
	if(!link) throw "Link not provided";
  try {
  let data = await axios({url: link });
  let $ = cheerio.load(data.data);
  let name = $('div.anime_video_body h1').text();
	let download = $("li.dowloads a").attr("href");

  if(!download) throw "Unable to scrap the downlaod link";
  data = await axios({url: download});
  $ = cheerio.load(data.data);
  download = $("div.dowload a").attr("href");

  return {name, download}
  } catch(err) {
    throw err;
  }
}

module.exports = getFromLink;