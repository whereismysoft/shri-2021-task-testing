const assert = require('chai').assert;

describe('Hermione tests', async function () {
    hermione.only.in('chrome');
    it('desktop test', async function () {
        await this.browser.url('https://shri.yandex/hw/store/catalog');
        await this.browser.execute(() => { document.querySelector('body').style.overflow = 'hidden' })

        const navBlock = this.browser.$('.navbar')
        await navBlock.waitForExist()

        await this.browser.assertView('desktop_nav', '.navbar');
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
        await this.browser.execute(() => { document.querySelector('body').style.overflow = 'hidden' })

        const burger = await this.browser.$('.navbar-toggler')

        await burger.waitForExist()
        await this.browser.execute(() => { document.querySelector('.navbar-toggler').click() })
        await this.browser.assertView('mobile_nav_toggled', '.navbar', {
            tolerance: 3
            // captureElementFromTop: true,
            // antialiasingTolerance: 5,
        })
    });

    hermione.only.in('chromeMobile');
    it('touch catalog grid should be ok', async function () {
        await this.browser.url('https://shri.yandex/hw/store/catalog');

        const product = this.browser.$('.ProductItem')

        await product.waitForExist()
        await this.browser.execute(() => { document.querySelectorAll('.card-body')[0].style.opacity = '0' })
        await this.browser.assertView(
            'mobile_catalog', '.ProductItem',
            {
                allowViewportOverflow: true,
                // captureElementFromTop: true,
                screenshotDelay: 1000
            }
        )
    });

    hermione.only.in('chrome');
    it('Cart item  nav should display correct count', async function () {
        await this.browser.url('https://shri.yandex/hw/store/catalog');

        const firstProduct = await this.browser.$('.ProductItem')
        await firstProduct.waitForExist()
        await firstProduct.$('.card-link').click()
        await this.browser.$('.btn').waitForExist()
        await this.browser.$('.btn').click()
        await this.browser.$('.nav-link').click()

        const secondProduct = await this.browser.$('.Catalog .row:nth-child(2) div+div')

        await secondProduct.$('.card-link').click()
        await this.browser.$('.btn').waitForExist()
        await this.browser.$('.btn').click()

        const cartLinkText = await this.browser.$('.nav-link:nth-child(4)').getText()
        assert.isTrue(cartLinkText.includes('(2)'), 'cart link have a 2 products added')
    });
});

// добавление в карту различных продуктов
// тесты для скриншотов (проврека адаптивности)