const assert = require('chai').assert;

describe('github', async function () {
    hermione.skip.in("chromeMobile", "");
    it('should find hermione', async function () {
        await this.browser.url('https://shri.yandex/hw/store/catalog');
    });

    it('should work anywhere', async function () {
        await this.browser.url('https://shri.yandex/hw/store/catalog');
    });
});

// добавление в карту различных продуктов
// тесты для скриншотов (проврека адаптивности)