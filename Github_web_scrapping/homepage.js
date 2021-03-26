const request= require("request");
const cheerio= require("cheerio");
const fs=require("fs");
const getrepos=require("./getrepos");
 

request("https://github.com/topics",cb);


function cb(error,response,data)
{
    parsedata(data);
}

function parsedata(html){
    let ch=cheerio.load(html);
    let allATags= ch(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0 ; i<allATags.length ; i++){
        let aTag = allATags[i+""];
        let link = ch(aTag).attr("href");
        let completeLink = "https://github.com"+link;
        // console.log(completeLink);
        let namedata= link.split("/");
        let name=namedata[namedata.length-1];
        let filepath=`./${name}`;
        fs.mkdirSync(filepath);
        //console.log(link);
        getrepos(completeLink,name);
    }  
}