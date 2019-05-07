const request = require('request');
const tress = require('tress');
const cheerio = require('cheerio');
const urlResolve = require('url').resolve;
const ProductModel = require('./models/product');

let startPage = 1;

const SITE = 'https://www.citilink.ru';
const URL = (page = startPage) => `${SITE}/catalog/mobile/smartfony/?p=${page}`;

const SELECTORS = {
    PRODUCT_CARD: '.ddl_product_link',
    TITLE: '.main_content_inner h1',
    DESCRIPTION: '.main_content_inner .short_description'
};


const q = tress((url, done) => {
    request(url, {
        host: '107.152.153.235',
        port: '9198',
        username: 'keAcUH',
        password: 'eHDmho',
        userAgent: 'Mozilla/5.0 (Windows NT 5.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1'
    })
        .then(({html, statusCode, res}) => {
            const $ = cheerio.load(html);
            const $links = $(SELECTORS.PRODUCT_CARD);
            const $title = $(SELECTORS.TITLE);

            if ($title.length) {
                const title = $title.text();
                const description = $(SELECTORS.DESCRIPTION).text();

                new ProductModel({
                    title,
                    description,
                }).save()

                console.log('NEXT CARD');
            }

            $links.each((i, link) => {
                q.push(urlResolve(SITE, $(link).attr('href')));
            });

            done();
        })
        .catch((e) => {
            q.kill();
            console.log(e)
        })
}, 10);

q.drain = () => {
    q.push(URL(startPage += 1));
    console.log('NEXT PAGE', startPage);
};

q.push(URL());