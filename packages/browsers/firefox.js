const { Builder } =  require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');


class ChromeBrowser {
    constructor(options = {}) {
        this.driverOption = new firefox.Options();

        if (options.proxy){
            const {
                host,
                port,
            } = options.proxy;

            this.driverOption.setProxy({
                proxyType: 'manual',
                httpProxy: host,
                httpProxyPort: port,
            });
        }

        this.driver = new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(this.driverOption)
            .build();
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