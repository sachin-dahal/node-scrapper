const express = require('express');
const axios = require('axios').default;
const cheerio = require('cheerio');

const app = express();

const website = "https://www.nepalnews.com/";

axios.get(website).then((resp) => {
    const html = resp.data;
    console.log(html);

    const $ = cheerio.load(html);

    let allNews = [];

    $('.el-item.uk-panel.uk-link-toggle.uk-display-block', html).each(function() {
        const title = $(this).text().trim();
        const url = $(this).attr('href');
        var category = url.substring(website.length + 2).split('/')[0];
        category = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');

        allNews.push({
            category,
            title,
            url
        });

        app.get('/', (req, res) => {
            res.json(allNews);
        });
    });

}).catch((err) => {
    console.log(err);
})

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Listening to Port: ${PORT}`);
});