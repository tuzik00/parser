const { ChromeBrowser, FireFoxBrowser } = require('browsers');

const chrome = new FireFoxBrowser();

chrome.get('https://2ip.ru/')
    .then((data) => {});
