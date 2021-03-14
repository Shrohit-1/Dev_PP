const request=require("request");
const cheerio=require("cheerio");


let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard";

let player={};


request(url,function cb(error,response,data){
    parsebody(data);
});

function parsebody(html){

    let highestwicket=0;
    let playername;
    let playereco;


    let ch=cheerio.load(html);
    let bowlingtables=ch('.Collapsible .table.bowler');
    for(let i=0 ; i<bowlingtables.length ; i++){
        let bowlingtable=bowlingtables[`${i}`];
        let alltr = ch(bowlingtable).find("tbody tr");
        for(let j=0; j< alltr.length;j++)
        {
            let alltds=ch(alltr[j]).find("td");
            let currentwickets=ch(alltds['4']).text();
            if(highestwicket<currentwickets)
            {
                highestwicket=currentwickets;
                playername=ch(alltds['0']).text();
                playereco=ch(alltds['5']).text();
            }
        }
    }
    player.wickets=highestwicket;
    player.name=playername;
    player.economy=playereco;
    console.log(player);
}


