const fs = require('fs');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

var chromeOptions = new chrome.Options();
chromeOptions.addArguments("start-maximized")
.addArguments("lang=pt-BR")
.addArguments("-incognito")
.addArguments('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36')
.addArguments('accept-language=pt-BR');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

const driver = new webdriver.Builder()
.withCapabilities(chromeOptions)
.build();

const sendMessageAsync  = async (phone, message) => {
    let messageEncoded = encodeURI(message);
    console.log(phone);
    console.log(messageEncoded);

    await driver.get('https://www.google.com.br');
    await driver.sleep(1000);
    await driver.get(`https://web.whatsapp.com/send?phone=${phone}&text=${messageEncoded}`);
    await driver.executeScript('window.onbeforeunload = ()=>{}');
    const inputMessage = await waitUntilElementWithTextExists('_1U1xa', 'button');
    await inputMessage.click();    
};

const startBrowser = async () => {
    await sendMessageAsync('xxxxxxxx', 'opa e ai Avelino?');
    await driver.sleep(5000);
    await sendMessageAsync('xxxxxxxx', 'Legal, olha só o que tenho pra você');
    await driver.sleep(5000);
    await sendMessageAsync('xxxxxxxx', 'Bom demais né!');
    await driver.sleep(5000);
    await sendMessageAsync('xxxxxxxx', 'Só falar comigo');
    await driver.sleep(5000);
    await sendMessageAsync('xxxxxxxx', 'Ta sussa');
    await driver.sleep(5000);

    driver.quit();
};



startBrowser().then();

async function waitUntilElementWithTextExists(className, tagName) {
    let elementExists = false;
    let element;
    let elementSelector = ""+tagName+"[class='"+className+"']";

    do {
        try {
            element = await driver.findElement(By.css(elementSelector));
            await driver.wait(until.elementIsVisible(element), 15000);
            elementExists = true;
        }
        catch (ex){
            //console.log(ex);
            elementExists = false;
        }
    } while (!elementExists);

    return element;
}
