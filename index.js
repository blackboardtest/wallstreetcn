hubble.getXML('https://dedicated.wallstreetcn.com/rss.xml', function (error, response, $) {
	$('item').each(function (index, value) {

		var url = $(this).find('link').text();
		var key = url.substring(url.lastIndexOf('/') + 1);
		var dom = $(this);

		articles.get('key', key, function (article) {
			if (article) {
				return;
			}

			var title   = dom.find('title').text().trim();
			var content = dom.find('description').text();
			var summary = content.trim().substring(0, 50);

			var $ = cheerio.load(content);

			var image = $('img').eq(0).attr('src');

			var article = {
				key: key,
				title: title,
				content: content,
				summary: summary,
				url: url,
				image: image
			};
			articles.append(article);
		});
	});
});
