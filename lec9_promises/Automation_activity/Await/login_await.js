const puppeteer=require('puppeteer');
const id="dodeko6360@bombaya.com";
const pass="123456789";

(async function(){
    let browser=await puppeteer.launch({ headless : false ,defaultViewport:null});
    let pages=await browser.pages();
    let tab=await pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2",pass);
    await tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
    
    console.log("logged In!!!!")

    await tab.waitForSelector('#base-card-1-link');
    await tab.click('#base-card-1-link');

    console.log("Warm up page");

    await tab.waitForSelector('a[data-attr1="warmup"]');
    await tab.click('a[data-attr1="warmup"]');

    console.log("Question page");

})()