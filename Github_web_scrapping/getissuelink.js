const request= require("request");
const cheerio= require("cheerio");
const fs=require("fs");
const getissue=require("./getissue");

 
function getissuelink(link,project_name,repo_name ){
    
    request(link,function cb(error,response,data){
        parsedata(data,project_name,repo_name);
    });
}



function parsedata(html,project_name,repo_name){
    let ch=cheerio.load(html);
    let allATags=ch('.js-selected-navigation-item.UnderlineNav-item.hx_underlinenav-item.no-wrap.js-responsive-underlinenav-item');
    let aTag=allATags[1+""];
    let link = ch(aTag).attr("href");
    let completelink="https://github.com"+link;
    //console.log(completelink);
    getissue(completelink,project_name,repo_name);
}    


module.exports=getissuelink;