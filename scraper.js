const request = require('request');
const cheerio = require('cheerio');

request('https://webscraper.io/test-sites/e-commerce/allinone', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        // console.log(html);
        const $ = cheerio.load(html);
        // Benefit of this is that we can use that variable just as jquery for selection

        // const siteHeading = $('.blog-hero');
        const siteHeading = $('.jumbotron');

        // console.log(siteHeading);
        // console.log(siteHeading.html());
        // console.log(siteHeading.text());

        // const output = siteHeading.find('h1').text();
        // console.log(siteHeading.find('h1').text());
        // const output = siteHeading
        //     .children('h1')
        //     .next()
        //     .text();
        const output = siteHeading
            .children('h1')
            .parent()
            .text();
        // console.log(output);

        $('#side-menu li').each((index, element) => {
            const item = $(element).text();
            const link = $(element).find('a').attr('href');
            // console.log(item);
            console.log(link);
        });
    }
});
