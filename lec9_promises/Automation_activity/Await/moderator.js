const puppeteer=require('puppeteer');
const id="dodeko6360@bombaya.com";
const pw="123456789";



(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
      }); // 10 sec
    let allPages = await browser.pages();
    let tab = allPages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await tab.click('div[data-analytics="NavBarProfileDropDown"]');
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    // delay
    await tab.waitForTimeout(3000);
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a' , {visible:true});
    let bothATags = await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');
    let manageChallengeATag = bothATags[1];
    await manageChallengeATag.click();
    
    let page=true;
    while(page){

        await tab.waitForSelector('.backbone.block-center');
        let allATags=await tab.$$('.backbone.block-center');
        let allChallenges=[];
        for(let i=0;i<allATags.length;i++){
            let ChallengeLink= await tab.evaluate(function(elem){ 
                return elem.getAttribute('href');
            },allATags[i]);
            console.log('https://www.hackerrank.com'+ChallengeLink);
            allChallenges.push('https://www.hackerrank.com'+ChallengeLink);
        }
        console.log("func called;")
        await addonepage(allChallenges,browser);

        let allLIS=await tab.$$('.pagination li');
        let nextpage= allLIS[allLIS.length-2];
        console.log(nextpage);
        let right=await tab.evaluate(function(elem){ return elem.classList.contains("disabled")}, nextpage);
        if(right){
            break;
        }
        else{
            console.log("agla page");
            nextpage.click();
        }
    }

   
})()

async function addonepage(allChallenges,browser){

    for(let i=0;i<allChallenges.length;i++){

        let moderator="xdddddddddd"
        let newTab=await browser.newPage();
        await newTab.goto(allChallenges[i]);
        
        await newTab.waitForSelector('li[data-tab="moderators"] a')
        await newTab.waitForTimeout(1000);
        await newTab.click('li[data-tab="moderators"] a');

        await newTab.waitForSelector('li[data-tab="moderators"] a')
        await newTab.click('li[data-tab="moderators"] a');
        

        await newTab.waitForSelector('#moderator');
        await newTab.type('#moderator',moderator);
        
        await newTab.click('.btn.moderator-save');
        

        await newTab.click('.save-challenge.btn.btn-green');
        
        await newTab.close();
        
    }


}

 