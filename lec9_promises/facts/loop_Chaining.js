
const fs=require("fs");
let files=["./f1.txt" ,"./f2.txt","./f3.txt"];

let f1kapromise=fs.promises.readFile(files[0]);

for(let i=1;i<files.length;i++){
    f1kapromise=f1kapromise.then(function(data){
        console.log(data+"");
        let nextKaPromise= fs.promises.readFile(files[i]);
        return nextKaPromise;
    })
}

f1kapromise.then(function(data){
    console.log(data+"");
})


