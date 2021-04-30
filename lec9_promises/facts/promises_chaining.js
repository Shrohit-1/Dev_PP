
        
        
        //-----------promise chaining ki help se callback hell se bachna jab async functions ko serially execute karna ho
        
const fs=require("fs");

/*
let pendingpromise1=fs.promises.readFile("f1.txt");  //pendingpromise has pending satate until data is recieved


let thenkapendingpromise = pendingpromise1.then(function (data){   //thenkapending has initial status as pending and it changes as soon as scb execution is complete and will store data returned by scb
                                                                  //as scb is not returning any data this time so thenkapending after changing state from pending will show undefined
});   

thenkapendingpromise.then(function (data){                       //called when thenkapending k status ka status change ho jaye

})

*/

let pendingpromise1=fs.promises.readFile("f1.txt");  


pendingpromise1.then(function (data){                                       //called after recieving file1 ka data 
    console.log(data+"");

    let pendingpromisef2=fs.promises.readFile("f2.txt");
    return pendingpromisef2;

}) 
.then(function(data){                                            //called after scb is executed and data in this scb will be the data returned from last one that is f2 ka data
    console.log(data+"");

    let pendingpromisef3=fs.promises.readFile("f3.txt");
    return pendingpromisef3;

})
.then(function(data){                                            //ye call hoga jab f2 wala jo scb hai run kar jayega or isme data k andar f3 ka data hai
 
    console.log(data+"");

})


//promises chaining data recieve kar k then par call(then bhi async hai or pending state return karta hai) , then ka scb poora execute hote he pending state hatt jayegi to uske upar 
//jo f2 wala then hai wo chal jayega or aise he humara f2 k baad f3 wala then chalega

// then and scb are in sync with each other

//in this way we can exit callback hell problem and this is more readable and understandable