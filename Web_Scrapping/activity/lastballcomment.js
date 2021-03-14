const request=require("request");
const cheerio=require("cheerio");


let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary ";

request(url,function cb(error,response,body){
    parsebody(body);
});

function parsebody(html){
    let ch=cheerio.load(html);
    let alldata=ch('div[itemprop="articleBody"] p');
    let neededdata=ch(alldata['0']).text();  // ch mei alldata['0'] ko search kar k return karo
    console.log(neededdata);
}



