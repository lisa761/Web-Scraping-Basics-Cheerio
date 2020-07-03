const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('items-scraping.csv');

// Write Headers
writeStream.write(`Title,Price,Stars,Reviews,Link \n`);

request('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.thumbnail').each((index, element) => {
            const item = $(element).find('a.title');

            const title = item.text();
            // .replace(/\s\s+/g, ''); For removing white space but not between the words
            const link = item.attr('href');
            const price = $(element)
                .find('.price')
                .text();
            const description = $(element)
                .find('.description')
                .text();
            const reviews = $(element)
                .find('.ratings .pull-right')
                .text();
            const stars = $(element)
                .find('.ratings span')
                .parent()
                .attr('data-rating');

            // Write Row to CSV
            writeStream.write(`${title}, ${price}, ${stars}, ${reviews}, ${link} \n`);
        });

        console.log('Scraping Done!');
    }
});
