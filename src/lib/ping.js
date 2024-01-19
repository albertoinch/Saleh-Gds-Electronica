const ping = require('ping');

module.exports = {
    alive: function() {
        return new Promise((resolve) => {
            ping.sys.probe('8.8.8.8', isAlive => {
                resolve(isAlive);
            });
        });
    }
};