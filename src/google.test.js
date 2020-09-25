const fs = require('fs');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

jest.setTimeout(15000);

describe('test google.com', () => {

    var driver;
 
    beforeEach( async () => {
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
        await driver.sleep(5000);
    });

    
 
    afterEach(async () => {
        driver.quit();
        await driver.sleep(5000);
    });
 
    it('should open google search', async () => {
        await driver.get('http://www.google.com');
        driver
            .getTitle()
            .then(title => {
                expect(title).toEqual('Google');
            });
    });
 
    it('should open google search and view search results', async () => {
        await driver.get('http://www.google.com');
        var element = await driver.findElement(By.css('input[name=q]'));
        await element.sendKeys("selenium", Key.RETURN);
        await driver.wait(until.titleContains("selenium"), 4000);
        driver
            .getTitle()
            .then(title => {
                expect(title).toContain('selenium');
            });
    });
 
    it('should open google search and do image search', async () => {
        await driver.get('http://www.google.com');
        var element = await driver.findElement(By.css('input[name=q]'));
        await element.sendKeys("selenium", Key.RETURN);
        await driver.wait(until.titleContains("selenium"), 4000);
        var imageSearch = driver.findElement(By.xpath("//a[contains(text(), 'Imagens')]"));
        await imageSearch.click();
        let image = await driver.takeScreenshot();
        fs.writeFileSync('out.png', image, 'base64');
        await driver.sleep(5000);
    });
 
});