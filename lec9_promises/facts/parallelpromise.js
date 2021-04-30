const fs= require("fs");

let f1promise=fs.promises.readFile("f1.txt");
let f2promise=fs.promises.readFile("f2.txt");
let f3promise=fs.promises.readFile("f3.txt");

f1promise.then(function(data){
    console.log(data+"");
});
f2promise.then(function(data){
    console.log(data+"");
});
f3promise.then(function(data){
    console.log(data+"");
});