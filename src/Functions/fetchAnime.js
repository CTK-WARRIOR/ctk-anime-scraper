const cheerio = require("cheerio");
const axios = require("axios");
const { base_url } = require("../constant.json")
const getEpisodes = require("./getEpisodes.js");

const fetchAnime = async (link, options) => {
	if (!link) throw "Anime link is not provided";
  try {
	let data = await axios({ url: link });
	let $ = cheerio.load(data.data);
	let animeData = {}

	animeData.name = $('div.anime_info_body_bg h1').text() || null
	animeData.image = $('div.anime_info_body_bg img').attr("src")
	$('div.anime_info_body_bg p.type').each(function(i, elem) {
		$x = cheerio.load($(this).html())
		let keyName = $x('span').text().toLowerCase().replace(":", "").trim().replace(/ /g, "_")
		if (keyName === 'plot_summary' || keyName === 'released') animeData[keyName] = $(this).html().replace(`<span>${$x('span').text()}</span>`, '')
		else animeData[keyName] = $x('a').text().trim() || null
	})
  animeData.episodeCount = $('ul#episode_page li a.active').attr("ep_end");
  if(options.disableEpisodeFetch) return animeData;
  let start_range = 1;
  let end_range = animeData.episodeCount;
  if(options.episode && !options.mass_episodes) {
    start_range = options.episode
    end_range = options.episode
  }
  if(options.mass_episodes) end_range = options.mass_episodes;
  if(end_range > animeData.episodeCount) throw "Invalid episode range !!"
	let name = link.replace(`${base_url}/category/`, "")
	animeData.episodes = await getEpisodes(name, start_range, end_range)
	return animeData;
  } catch(err) {
    throw err;
  }
}

module.exports = fetchAnime;
