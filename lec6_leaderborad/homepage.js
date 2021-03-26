const request= require("request");
const cheerio= require("cheerio");
const getAllMatches= require("./allmatches");
const { html } = require("cheerio");


request("https://www.espncricinfo.com/series/ipl-2020-21-1210595",cb);


function cb(error,response,data)
{
    parsedata(data);
}

function parsedata(html){
    let ch=cheerio.load(html);
    let atag= ch('.widget-items.cta-link a');

    let link=atag['0']["attribs"]["href"];
    let completelink="https://www.espncricinfo.com"+link;

    getAllMatches(completelink);
}
