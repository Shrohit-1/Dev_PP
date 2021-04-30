const puppeteer=require('puppeteer');
const id="dodeko6360@bombaya.com";
const pass="123456789";
let tab;
let idx;
let gcode;

let browserkapromise= puppeteer.launch({ headless : false ,defaultViewport:null});

browserkapromise.then(function(browser){
    let pageskapromise=browser.pages();
    return pageskapromise;
})
.then(function(pages){
    tab=pages[0];
    let tabkapromise=tab.goto("https://www.hackerrank.com/auth/login");
    return tabkapromise;
})
.then(function(  ){
     let idkapromise=tab.type("#input-1", id);
     return idkapromise;
})
.then(function( ){
    let pwkapromise=tab.type("#input-2",pass);
    return pwkapromise;
})
.then(function(){
    loginpromise=tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
    return loginpromise;
})
.then(function(){
    console.log("logged in");
    let waitandclickpromise= waitandclick('#base-card-1-link');
    return waitandclickpromise;
})
.then(function(){
    console.log("warmup page");
    let waitandclickpromise=waitandclick('a[data-attr1="warmup"]');
    return waitandclickpromise;
})
.then(function(){
    console.log("question page");
    let waitkapromise=tab.waitForSelector(".js-track-click.challenge-list-item",{visible:true});
    return waitkapromise;
})
.then(function(){
     
     let allaTags=tab.$$('.js-track-click.challenge-list-item');
     return allaTags;
})
.then(function(allaTags){
    let allQueslink=[];
    for(let i=0;i<allaTags.length;i++){
        let aTag=allaTags[i];
        let link=tab.evaluate(function(elem){
            return elem.getAttribute("href");
        },aTag);
        allQueslink.push(link);

    }
    let sabkapromise=Promise.all(allQueslink);
    return sabkapromise;
})
.then(function(alllinks){
    let completelinks=alllinks.map(function(link){
        return "https://www.hackerrank.com/"+link;
    })

    let oneQuesSolvePromise = quesSolution(completelinks[0]);
    for(let i=1;i<completelinks.length;i++){
        oneQuesSolvePromise= oneQuesSolvePromise.then(function(){
            let nextKaPromise=quesSolution(completelinks[i]);
            return nextKaPromise;
        })
    }
    return oneQuesSolvePromise;

})
.then(function(){
    console.log("all questions solved successfully !!!!!!");
})
.catch(function(error){
    console.log(error);
})



function waitandclick(selector){
    return new Promise(function(resolve,reject){
        let waitpromise = tab.waitForSelector(selector,{visible:true});
        waitpromise.then(function(){
            let clickpromise=tab.click(selector);
            return clickpromise;
        })
        .then(function(){
            resolve();  
        })
        .catch(function(error){
            reject(error);
        })
    })
}


function quesSolution(qlink){
    return new Promise(function(resolve,reject){
        let qlinkpromise=tab.goto(qlink);
        qlinkpromise.then(function(){
            let waitandclickpromise=waitandclick('div[data-attr2="Editorial"]');
            return waitandclickpromise;
        })
        .then(function(){
            let codeKaPromise=getdata();
            return codeKaPromise;
        })
        .then(function(){
            let pasteKaPromise=pasteData();
            return pasteKaPromise;
        })
        .then(function(){
            let submitKaPromise=tab.click('.pull-right.btn.btn-primary.hr-monaco-submit');
            return submitKaPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    })
}



function getdata(){
    return new Promise(function(resolve,reject){
        let waitandclickpromise= tab.waitForSelector(".hackdown-content h3");
        waitandclickpromise.then(function(){
            let allLanguages=tab.$$(".hackdown-content h3");
            return allLanguages;
        })
        .then(function(allLanguages){
            let allLanguagespromise=[];
            for(let i =0;i<allLanguages.length;i++){
                 let  Language=tab.evaluate(function(elem){
                      return elem.textContent;
                 },allLanguages[i]);
                 allLanguagespromise.push(Language);
            }
            let sabkapromise=Promise.all(allLanguagespromise);
            return sabkapromise;
        })
        .then(function(allLanguages){
            
            for(let i=0;i<allLanguages.length;i++){
                if(allLanguages[i]=="C++"){
                    idx=i;
                    break;
                }
            }
            let codedivkapromise=tab.$$(".hackdown-content .highlight");
            return codedivkapromise;
        })
        .then(function(allCodeDiv){
            let codediv=allCodeDiv[idx];
            let code=tab.evaluate(function(elem){
                return elem.textContent;
            },codediv);
            return code;
        })
        .then(function(code){
            gcode=code;
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    })
}


function pasteData(){
    return new Promise(function(resolve,reject){

        let clickkapromise=tab.click('div[data-attr2="Problem"]');

        clickkapromise
        .then(function(){
        let waitandclickpromise=waitandclick(".custom-input-checkbox");
        return waitandclickpromise;
        })
        .then(function(){
        let waitkapromise=tab.waitForSelector('.custominput');
        return waitkapromise; 
        })
       .then(function(){
        let typekapromise=tab.type(".custominput", gcode);
        return typekapromise;
        })
        .then(function(){
        let controlkapromise=tab.keyboard.down('Control');
        return controlkapromise;
        })
       .then(function(){
        let pressAkaPromise=tab.keyboard.press('A');
        return pressAkaPromise;
        })
        .then(function(){
        let pressXkaPromise=tab.keyboard.press('X');
        return pressXkaPromise;
        })
       .then(function(){
        let clickKaPromise=tab.click('.monaco-editor.no-user-select.vs');
        return clickKaPromise;
        })
        .then(function(){
        let pressAkaPromise=tab.keyboard.press('A');
        return pressAkaPromise;
        })
        .then(function(){
        let pressVkaPromise=tab.keyboard.press('V');
        return pressVkaPromise;
        })
        .then(function(){
        let controlUpKaPromise=tab.keyboard.up('Control');
        return controlUpKaPromise;
        })
        .then(function(){
        resolve();
        })
        .catch(function(error){
        reject(error);
        })
   })
}