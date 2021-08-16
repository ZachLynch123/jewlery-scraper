const got = require('got');
const cheerio = require('cheerio');

const url = "https://www.etsy.com/c/jewelry?ref=catcard-10922-386094236&explicit=1"

let itemObjs = []


class Items {
    constructor(title, stars, price) {
        this.title = title;
        this.stars = stars;
        this.price = price;
    }
}

got(url)
.then(res => {
    const $ = cheerio.load(res.body);

    const list = $(".responsive-listing-grid").children();
    list.map((i, item) => {
        const title = $(item).find('h3').text();
        const stars = $(item).find('.screen-reader-only').text();
        const price = $(item).find('.currency-value').text();
        
        const jewelry = new Items(title, stars, price);
        itemObjs.push(jewelry);
        return jewelry;
    })
})
.catch(e => {console.log(e);})




















