const request= require("request");
const cheerio= require("cheerio");
const fs=require("fs");

 
function getissue(link,project_name,repo_name){
    request(link,function cb(error,response,data){
        parsedata(data,project_name,repo_name);
    });
}



function parsedata(html,project_name,repo_name){
    let ch=cheerio.load(html);
    let allATags=ch('.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title');
     
    let filepath=`./${project_name}/${repo_name}/issue.json`;

    let issues=[];
    for(let i=0 ; i<allATags.length ; i++){
        let aTag = allATags[i+""];
        let link = ch(aTag).attr("href");
        let completeLink = "https://github.com"+link;
        let topic=ch(aTag).text();
        let Obj={
            Topic:topic,
            Link:completeLink
        };
        issues.push(Obj);  
    }
    let stringifieddata=JSON.stringify(issues);
    fs.writeFileSync(filepath,stringifieddata);
    
}    


module.exports=getissue;