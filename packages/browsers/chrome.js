const { Builder } =  require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');


class ChromeBrowser {
    constructor(options = {}) {
        this.driverOption = new chrome.Options();

        if (options.proxy){
            const {
                host,
                port,
            } = options.proxy;

            this.driverOption.addArguments(`--proxy-server=http://${host}:${port}`)
        }

        this.driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(this.driverOption)
            .build()
    }

    close(){
        return this.driver.close();
    }

    get(url){
        return this.driver.get(url)
            .then(() => this.driver.executeScript(() => document.querySelector('html').innerHTML))
    }
}


module.exports = ChromeBrowser;