const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");



function getMatch(link){
    request(link,cb);
}

function cb(error,response,data)
{
    parsedata(data);
}



function parsedata(html)
{
    let ch=cheerio.load(html);
    let bothinnings=ch('.match-scorecard-page .Collapsible');
    for(let i=0;i<bothinnings.length;i++){
        let inning= ch(bothinnings[i+""]);
        let teamname=inning.find("h5").text();
        teamname=teamname.split("INNINGS")[0].trim();

        console.log(teamname);

        let batsmantable=inning.find(".table.batsman");
        let alltrs=batsmantable.find("tbody tr");
        for(let j=0;j<alltrs.length;j=j+2)
        {
            let alltds=ch(alltrs[j]).find("td");
            let batsmanname=ch(alltds['0']).text().trim();
            let runs=ch(alltds['2']).text().trim();
            let sr=ch(alltds['7']).text().trim();


            processbatsman(teamname,batsmanname,runs,sr);
        }
    }
    console.log("##########################################");
}

function checkteamnamefile(teamname){
    let teampath=`./IPL/${teamname}`;
    return fs.existsSync(teampath);
}

function checkbatsmanfile(teamname,batsmanname){
    let batpath=`./IPL/${teamname}/${batsmanname}.json`;
    return fs.existsSync(batpath);
}

function createteamfile(teamname){
    let teampath=`./IPL/${teamname}`;
    fs.mkdirSync(teampath);
}

function createbatsmanfile(teamname,batsmanname,runs,sr){
    let batpath=`./IPL/${teamname}/${batsmanname}.json`;
    let batfile=[];
    let inning={
        name:batsmanname,
        runs:runs,
        strike_rate:sr
    }
    batfile.push(inning);
    let stringifieddata=JSON.stringify(batfile);
    fs.writeFileSync(batpath,stringifieddata);
}

function updatebatsmanfile(teamname,batsmanname,runs,sr){
    let batpath=`./IPL/${teamname}/${batsmanname}.json`;
    let stringifieddata=fs.readFileSync(batpath);
    let batfile=JSON.parse(stringifieddata);
    let inning={
        name:batsmanname,
        runs:runs,
        strike_rate:sr
    }
    batfile.push(inning);
    fs.writeFileSync(batpath,JSON.stringify(batfile));
}



function processbatsman(teamname,batsmanname,runs,sr)
{
    let isteam=checkteamnamefile(teamname);
    if(isteam)
    {
        let isbatsman=checkbatsmanfile(teamname,batsmanname);
        if(isbatsman){
            updatebatsmanfile(teamname,batsmanname,runs,sr);
        }
        else{
            createbatsmanfile(teamname,batsmanname,runs,sr);
        }
    }
    else{
        createteamfile(teamname);
        createbatsmanfile(teamname,batsmanname,runs,sr);
    }
}



module.exports= getMatch;

