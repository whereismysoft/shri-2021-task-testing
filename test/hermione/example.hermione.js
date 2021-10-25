const assert = require('chai').assert;

describe('Hermione tests', async function () {
    hermione.only.in('chrome');
    it('desktop test', async function () {
        await this.browser.url('https://shri.yandex/hw/store/catalog');

        const navBlock = this.browser.$('.navbar')
        await navBlock.waitForExist()

        await this.browser.assertView('desktop_nav', '.navbar', { captureElementFromTop: true, screenshotDelay: 1000 });
    });

    // hermione.only.in('chromeMobile');
    // it('touch should have burger', async function () {
    //     await this.browser.url('https://shri.yandex/hw/store/catalog');

    //     const navbar = this.browser.$('.navbar')

    //     await navbar.waitForExist()
    //     await this.browser.assertView('mobile_nav', '.navbar')
    // });

    hermione.only.in('chromeMobile');
    it('Should display navbar on burger click', async function () {
        await this.browser.url('https://shri.yandex/hw/store/catalog');

        const burger = this.browser.$('.navbar-toggler')

        await burger.waitForExist()
        await burger.click()
        await this.browser.assertView('mobile_nav_toggled', '.navbar', {
            captureElementFromTop: true,
            screenshotDelay: 1000
        })
    });

    hermione.only.in('chromeMobile');
    it('touch catalog grid should be ok', async function () {
        await this.browser.url('https://shri.yandex/hw/store/catalog');

        const product = this.browser.$('.ProductItem')

        await product.waitForExist()
        await this.browser.assertView(
            'mobile_catalog', '.ProductItem',
            {
                ignoreElements: ['.card-body'],
                allowViewportOverflow: true,
                captureElementFromTop: true,
                screenshotDelay: 1000
            }
        )
    });

    // hermione.only.in('chrome');
    // it('Cart item  nav should display correct count', async function () {
    //     await this.browser.url('https://shri.yandex/hw/store/catalog');

    //     const firstProduct = await this.browser.$('.ProductItem')
    //     await firstProduct.waitForExist()
    //     await firstProduct.$('.card-link').click()
    //     await this.browser.$('.btn').waitForExist()
    //     await this.browser.$('.btn').click()

    //     console.log('[text]', await this.browser.$('.nav-link:nth-child(4)').getText())
    // });
});

// добавление в карту различных продуктов
// тесты для скриншотов (проврека адаптивности)