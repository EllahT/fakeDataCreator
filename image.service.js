const cheerio = require('cheerio');
const axios = require('axios');
const utilService = require('./util.service');

module.exports = {
    getRandomImage
}

// const TERM = 'travel';

function getRandomImage(term) {
    return axios.get(`http://www.istockphoto.com/il/photos/${term}`)
    .then(res => {
        const $ = cheerio.load(res.data);
        const imgs = $('img.srp-asset-image');
        return imgs[utilService.getRandomInt(0, imgs.length)].attribs.src;
    })
}



