const fs= require("fs");

function mypromisifiedfunc(filepath){
    return new Promise(function(resolve,reject){
        fs.readFile(filepath,function(error,data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}

let pendingpromise = mypromisifiedfunc("./f1.txt");

pendingpromise.then(function(data){
    console.log(data+"");
});

pendingpromise.catch(function (error){
    console.log(error);
});
