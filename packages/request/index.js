const needle = require('needle');
const tunnel = require('tunnel');


module.exports = (url, agent) => {
    if (agent) {
        const {
            host,
            port,
            username,
            password,
            userAgent,
        } = agent;

        agent = tunnel.httpsOverHttp({
            proxy: {
                host,
                port,
                proxyAuth: `${username}:${password}`,
                headers: {
                    'User-Agent': userAgent,
                }
            }
        });
    }

    return new Promise((resolve, reject) => {
        needle.get(url, {agent}, (err, res) => {
            if (err) {
                return reject(err);
            }

            resolve({
                res,
                html: res.body,
                statusCode: res.statusCode
            });
        });
    });
};