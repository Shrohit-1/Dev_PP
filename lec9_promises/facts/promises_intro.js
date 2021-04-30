const fs= require("fs");
let pendingpromise=fs.promises.readFile("f1.txt");         //pendingpromise is given pendingpromise value and its address 
console.log(pendingpromise);
pendingpromise.then(function(data){          //called when promise is successfull and data is given to then func
    console.log("inside them, scb");
    console.log(data);
    console.log(pendingpromise);
});

pendingpromise.catch(function(error){        //called when promise is not fulfilled and an error is given to catch func          
    console.log("inside catch-fcb");
});



// then and catch are async function as they also gives us a pendingpromises  then and catch are  pushed to waiting queue when data is recieved in node api