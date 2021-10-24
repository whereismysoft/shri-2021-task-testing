module.exports = {
    // baseUrl: 'https://shri.yandex/hw/store',
    // gridUrl: 'http://127.0.0.1:4444/wd/hub',
    sets: {
        desktop: {
            files: 'test/hermione',
            browsers: ['chrome']
        },
        touch: {
            files: 'test/hermione',
            browsers: ['chromeMobile']
        }
    },
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
            }
        },
        chromeMobile: {
            desiredCapabilities: {
                browserName: 'chrome',
            },
            windowSize: {
                width: 414,
                height: 800
            },
        },
    }
};

// selenium-standalone start

// ./node_modules/.bin/hermione
// ./node_modules/.bin/hermione gui