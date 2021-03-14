const fs=require("fs");              //importing
const path=require("path");          //import
let folderpath="./downloads";
let extensions=require("util.js");



function checkfolder(extension){
    for(let key in extensions){
        
        let extfolderpath=folderpath;
        
        if(extensions[key].includes(extension)){
            extfolderpath="/"+ key;
            break;
        }   
    }    
}





function sortfolder(folderpath){
    let content= fs.readdirSync(folderpath); //no need of callback get content of folderpath--path to a file
    for(let i=0;i< content.length;i++)       //for accessing files in content array one by one
    {
        let extensionname=path.extname(content[i]);          //get etxn of file from full name
        //console.log(extensionname);
        let isfolder= checkfolder(extensionname);
    }
}

sortfolder(folderpath);
