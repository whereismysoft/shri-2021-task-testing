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
            },
            windowSize: {
                width: 1024,
                height: 900
            },
            screenshotMode: 'viewport'
        },
        chromeMobile: {
            desiredCapabilities: {
                browserName: 'chrome',
            },
            windowSize: {
                width: 414,
                height: 800
            },
            screenshotMode: 'viewport'
        },
    },
    plugins: {
        'html-reporter/hermione': {
            path: 'hermione-html-reporter'
        }
    },
};

// selenium-standalone start

// ./node_modules/.bin/hermione
// ./node_modules/.bin/hermione gui
// ./node_modules/.bin/hermione --update-refs