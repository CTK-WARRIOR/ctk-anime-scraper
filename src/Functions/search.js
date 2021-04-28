const cheerio = require("cheerio");
const axios = require("axios");
const { base_url } = require("../constant.json")

const search = async (name) => {
	if (!name) throw "anime name is not given.";
	try {
		let data = await axios({ url: base_url + "/search.html?keyword=" + name });
		let $ = cheerio.load(data.data);
		let cards = [];

		$('ul.items li').each(function(i, elem) {
			let object = {}
			$ = cheerio.load($(this).html());
			object.title = $('p.name a').text() || null;
			object.img = $('div.img a img').attr('src') || null;
			object.link = $('div.img a').attr('href') || null;
			object.releaseDate = $('p.released').text().trim() || null;
			if (object.link) object.link = base_url + object.link;

			cards.push(object);
		})

		return cards;
	} catch (err) {
		throw err;
	}
}

module.exports = search;

