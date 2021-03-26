const request= require("request");
const cheerio= require("cheerio");
const fs=require("fs");
const getissuelink=require("./getissuelink")

 
function getrepos(link,name){
     
    request(link,function cb(error,response,data){
        parsedata(data,name);
    });
}



function parsedata(html,fold_name){
    let ch=cheerio.load(html);
    let allATags= ch('.f3.color-text-secondary.text-normal.lh-condensed .text-bold');
    for(let i=0 ; i<5 ; i++){
        let aTag = allATags[i+""];                 
        let link = ch(aTag).attr("href");

        let completeLink =  "https://github.com/"+link;

        let namedata= link.split("/");                      //obtaining name of folder that is needed to create;
        let name=namedata[namedata.length-1];

        let filepath=`./${fold_name}/${name}`;
        fs.mkdirSync(filepath);
        //console.log(completeLink);
        getissuelink(completeLink,fold_name,name);
    }
}

module.exports=getrepos;